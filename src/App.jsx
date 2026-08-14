import { useRef, useState, useEffect } from 'react'
import AppTaskCounter from './components/AppTaskCounter'
import TaskItem from './components/AppTaskItem'
import Header from './components/AppHeader'
import { useModal } from './hooks/useModal'
import { useTasks } from './hooks/useTasks'
import AppModal from './components/AppModal'
import TaskModalContent from './components/TaskModalContent'
import AppWarning from './components/AppWarning'
import './styles/components/App.css'
import './styles/utilities.css'
import './styles/components/CategoryPicker.css'
import BottonBar from './components/BottonBar'
import AppInfoContent from './components/AppInfoContent'
import { useCategories } from "./hooks/useCategories";
import CategoryTabs from './components/CategoryTabs'
import { Plus } from 'lucide-react'
import CategoryManagerContent from './components/CategoryManagerContent'

function App() {
  const {modalMode, modalTaskId, modalText, setModalMode, setModalTaskId, setModalText, openAddModal, openEditMode, closeModal, modalCategoryID, setModalCategoryId} = useModal()
  const { categories, addCategory, updateCategory, getCategoryById, deleteCategory } = useCategories();
  const { tasks, activeTasks, completedTasks, editTask, handleDelete, handleCheck, addTask, clearCategoryFromTasks } = useTasks();
  const totalTask = tasks.length
  const progressPercent = totalTask === 0 ? 0 : Math.round((completedTasks.length / totalTask) * 100)
  const [inInfoOpen, setIsInfoOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)
  const [editingCategoryId, setEditingCategoryId] = useState(null)

  const [dragX, setDragX] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(false)
  const swipeStartRef = useRef(null)
  const swipeAxisRef = useRef(null)
  const swipeDetectedRef = useRef(false)
  const swipeViewportRef = useRef(null)
  const swipeVelocityRef = useRef(0) // px/ms, знак = направление
  const swipeLastPointRef = useRef(null) // { x, t }

  // --- wheel/trackpad state ---
  const wheelActiveRef = useRef(false)
  const wheelAxisRef = useRef(null) // 'horizontal' | 'vertical' | null
  const wheelDragXRef = useRef(0)
  const wheelEndTimerRef = useRef(null)
  const wheelLastDeltaXRef = useRef(0)

  const selectedCategoryValue = activeCategory ?? '__all__'
  const categoryValues = ['__all__', ...categories.map(category => category.id)]
  const currentIndex = categoryValues.indexOf(selectedCategoryValue)
  const prevValue = currentIndex > 0 ? categoryValues[currentIndex - 1] : null
  const nextValue = currentIndex < categoryValues.length - 1 ? categoryValues[currentIndex + 1] : null

  const filteredActiveTasks = activeTasks.filter(task =>
    activeCategory === null || task.categoryId === activeCategory
  )

  const filteredCompletedTasks = completedTasks.filter(task =>
    activeCategory === null || task.categoryId === activeCategory
  )

  function toCategoryId(value) {
    return value === '__all__' || value == null ? null : value
  }

  function getViewportWidth() {
    return swipeViewportRef.current?.offsetWidth || 300
  }

  // ограничиваем dragX шириной одной панели, чтобы жест не мог "пролистнуть" сразу несколько вкладок
  function clampDragX(value) {
    const width = getViewportWidth()
    return Math.max(-width, Math.min(width, value))
  }

  function handleSave() {
      if (modalText.trim() === '') return
      if (modalMode === 'add') {
          addTask(modalText, modalCategoryID)
      } else {
          editTask(modalTaskId, modalText, modalCategoryID)
      }
      closeModal()
  }
  function handleDeleteCategory(id) {
    deleteCategory(id)
    clearCategoryFromTasks(id)
    if (activeCategory === id) {
      setActiveCategory(null)
    }
  }

  function openCreateCategoryModal() {
    setEditingCategoryId(null)
    setIsCreatingCategory(true)
  }

  function openEditCategoryModal(categoryId) {
    setEditingCategoryId(categoryId)
    setIsCreatingCategory(true)
  }

  function closeCategoryManager() {
    setIsCreatingCategory(false)
    setEditingCategoryId(null)
  }

  // --- pointer (touch) swipe ---
  function handleSwipeStart(event) {
    if (!event.isPrimary || modalMode || isCreatingCategory || inInfoOpen) return

    swipeStartRef.current = { x: event.clientX, y: event.clientY }
    swipeAxisRef.current = null
    swipeVelocityRef.current = 0
    swipeLastPointRef.current = { x: event.clientX, t: performance.now() }
    setTransitionEnabled(false)
  }

  function handleSwipeMove(event) {
    const start = swipeStartRef.current
    if (!start || !event.isPrimary) return

    const dx = event.clientX - start.x
    const dy = event.clientY - start.y

    if (swipeAxisRef.current === null) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return
      swipeAxisRef.current = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical'
    }

    if (swipeAxisRef.current !== 'horizontal') return

    const now = performance.now()
    const last = swipeLastPointRef.current
    if (last) {
      const dt = now - last.t
      if (dt > 0) {
        swipeVelocityRef.current = (event.clientX - last.x) / dt
      }
    }
    swipeLastPointRef.current = { x: event.clientX, t: now }

    let next = dx
    if (currentIndex === 0 && next > 0) next = 0
    if (currentIndex === categoryValues.length - 1 && next < 0) next = 0

    setDragX(clampDragX(next))
  }

  function handleSwipeEnd(event) {
    const start = swipeStartRef.current
    const axis = swipeAxisRef.current
    const velocity = swipeVelocityRef.current
    swipeStartRef.current = null
    swipeAxisRef.current = null
    swipeLastPointRef.current = null

    if (!start || !event.isPrimary || axis !== 'horizontal') {
      setTransitionEnabled(true)
      setDragX(0)
      return
    }

    resolveSwipeEnd(dragX, velocity)
  }

  function handleSwipeCancel() {
    swipeStartRef.current = null
    swipeAxisRef.current = null
    swipeLastPointRef.current = null
    setTransitionEnabled(true)
    setDragX(0)
  }

  function handleSwipeClick(event) {
    if (!swipeDetectedRef.current) return

    event.preventDefault()
    event.stopPropagation()
    swipeDetectedRef.current = false
  }

  // --- shared "snap or bounce" logic used by both touch and trackpad ---
  // переключает ВСЕГДА максимум на 1 вкладку за жест, независимо от того,
  // насколько долго/резко тянули или крутили тачпад
  function resolveSwipeEnd(currentDragX, velocity) {
    const width = getViewportWidth()
    const distanceThreshold = width * 0.15
    const velocityThreshold = 0.35 // px/ms

    setTransitionEnabled(true)

    const passedByDistance = Math.abs(currentDragX) > distanceThreshold
    const passedByVelocity = Math.abs(velocity) > velocityThreshold && Math.abs(currentDragX) > 10

    if (passedByDistance || passedByVelocity) {
      const direction = passedByVelocity
        ? (velocity < 0 ? 1 : -1)
        : (currentDragX < 0 ? 1 : -1)

      const nextIndex = currentIndex + direction

      if (nextIndex >= 0 && nextIndex < categoryValues.length) {
        swipeDetectedRef.current = true
        setDragX(direction === 1 ? -width : width)

        setTimeout(() => {
          const nextCatValue = categoryValues[nextIndex]
          setTransitionEnabled(false)
          setActiveCategory(nextCatValue === '__all__' ? null : nextCatValue)
          setDragX(0)
        }, 250)
        return
      }
    }

    setDragX(0)
  }

  // --- trackpad (wheel) swipe ---
  function handleWheel(event) {
    if (modalMode || isCreatingCategory || inInfoOpen) return

    const { deltaX, deltaY } = event

    if (wheelAxisRef.current === null) {
      if (Math.abs(deltaX) < 2 && Math.abs(deltaY) < 2) return
      wheelAxisRef.current = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical'
    }

    if (wheelAxisRef.current !== 'horizontal') return

    // это горизонтальный жест — гасим страничный скролл/навигацию назад/вперёд
    event.preventDefault()

    if (!wheelActiveRef.current) {
      wheelActiveRef.current = true
      wheelDragXRef.current = 0
      setTransitionEnabled(false)
    }

    let next = wheelDragXRef.current - deltaX
    if (currentIndex === 0 && next > 0) next = 0
    if (currentIndex === categoryValues.length - 1 && next < 0) next = 0

    // не даём значению уйти дальше ширины одной панели — иначе резкий
    // прокрут тачпада выглядит как "долистывание до конца" сразу нескольких вкладок
    next = clampDragX(next)

    wheelDragXRef.current = next
    wheelLastDeltaXRef.current = deltaX
    setDragX(next)

    clearTimeout(wheelEndTimerRef.current)
    wheelEndTimerRef.current = setTimeout(() => {
      // жест закончился (трекпад перестал слать события)
      wheelActiveRef.current = false
      wheelAxisRef.current = null
      const velocity = -wheelLastDeltaXRef.current / 16 // грубая оценка px/ms по последнему кадру
      resolveSwipeEnd(wheelDragXRef.current, velocity)
      wheelDragXRef.current = 0
    }, 150)
  }

  useEffect(() => {
    return () => clearTimeout(wheelEndTimerRef.current)
  }, [])

  function renderTaskPanel(categoryValue) {
    if (categoryValue === undefined) return <div className="swipe-panel" />

    const catId = toCategoryId(categoryValue)
    const active = activeTasks.filter(task => catId === null || task.categoryId === catId)
    const completed = completedTasks.filter(task => catId === null || task.categoryId === catId)

    return (
      <div className="swipe-panel">
        <div className="task-lists flex-column">
          <p className="task-list-title">Active Tasks</p>
          {active.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              category={getCategoryById(task.categoryId)}
              onCheck={handleCheck}
              onEdit={openEditMode}
            />
          ))}
        </div>

        <div className="task-lists flex-column completed">
          <p className="task-list-title">Completed Tasks</p>
          {completed.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              category={getCategoryById(task.categoryId)}
              onCheck={handleCheck}
              onEdit={openEditMode}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className="main"
      onPointerDown={handleSwipeStart}
      onPointerMove={handleSwipeMove}
      onPointerUp={handleSwipeEnd}
      onPointerCancel={handleSwipeCancel}
      onClickCapture={handleSwipeClick}
      onWheel={handleWheel}
    >
      
      <AppWarning 
      warningText={"Пользуйтесь только на одном устройстве, иначе данные могут не сохраниться"
      }/>

      <Header
        openInfoModal={() => setIsInfoOpen(true)} 
      />

      <CategoryTabs 
      categories={categories}
      activeId={activeCategory}
      onChange={setActiveCategory}
      onDeleteCategory={handleDeleteCategory}
      onLongPressCategory={openEditCategoryModal}
      />

      <AppModal isOpen={modalMode != null} onClose={closeModal}>
        <TaskModalContent
        modalText={modalText}
        setModalText={setModalText}
        handleSave={handleSave}
        closeModal={closeModal}
        modalMode={modalMode}
        onDelete={()=> {handleDelete(modalTaskId); closeModal()}}
        categories={categories}
        addCategory={addCategory}
        selectedCategory={modalCategoryID}
        setSelectedCategory={setModalCategoryId}
        onDeleteCategory={handleDeleteCategory}
        onOpenManager={openCreateCategoryModal}
        onLongPressCategory={openEditCategoryModal}
        />
      </AppModal>

      <AppModal isOpen={isCreatingCategory} onClose={closeCategoryManager}>
        <CategoryManagerContent
          onCreate={addCategory}
          onUpdate={updateCategory}
          editingCategory={categories.find((category) => category.id === editingCategoryId) ?? null}
          closeModal={closeCategoryManager}
          onDelete={(id) => {
            handleDeleteCategory(id)
            closeCategoryManager()
          }}
        />
      </AppModal>
      
      <AppModal isOpen={inInfoOpen} onClose={() => setIsInfoOpen(false)}>
        <AppInfoContent />
      </AppModal>

      <div className="swipe-viewport" ref={swipeViewportRef}>
        <div
          className="swipe-track"
          style={{
            transform: `translateX(calc(-33.3333% + ${dragX}px))`,
            transition: transitionEnabled ? 'transform 0.25s ease' : 'none'
          }}
        >
          {renderTaskPanel(prevValue)}
          {renderTaskPanel(selectedCategoryValue)}
          {renderTaskPanel(nextValue)}
        </div>
      </div>

      <BottonBar 
        openAddModal={() => openAddModal(activeCategory)}
        onAddCategory={openCreateCategoryModal}
      />
    </div>
  )
}

export default App