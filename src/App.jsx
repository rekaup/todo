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
  const swipeStartRef = useRef(null)
  const swipeDetectedRef = useRef(false)
  const selectedCategoryValue = activeCategory ?? '__all__'
  const filteredActiveTasks = activeTasks.filter(task =>
    activeCategory === null || task.categoryId === activeCategory
  )

  const filteredCompletedTasks = completedTasks.filter(task =>
    activeCategory === null || task.categoryId === activeCategory
  )

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

  function handleSwipeStart(event) {
    if (!event.isPrimary || modalMode || isCreatingCategory || inInfoOpen) return

    swipeStartRef.current = { x: event.clientX, y: event.clientY }
    swipeDetectedRef.current = false
  }

  function handleSwipeEnd(event) {
    const start = swipeStartRef.current
    swipeStartRef.current = null
    if (!start || !event.isPrimary) return

    const distanceX = event.clientX - start.x
    const distanceY = event.clientY - start.y
    if (Math.abs(distanceX) < 50 || Math.abs(distanceX) <= Math.abs(distanceY)) return

    const values = ['__all__', ...categories.map(category => category.id)]
    const currentIndex = values.indexOf(selectedCategoryValue)
    const direction = distanceX < 0 ? 1 : -1
    const nextIndex = currentIndex + direction
    if (nextIndex < 0 || nextIndex >= values.length) return

    swipeDetectedRef.current = true
    const nextValue = values[nextIndex]
    setActiveCategory(nextValue === '__all__' ? null : nextValue)
  }

  function handleSwipeClick(event) {
    if (!swipeDetectedRef.current) return

    event.preventDefault()
    event.stopPropagation()
    swipeDetectedRef.current = false
  }

  return (
    <div
      className="main"
      onPointerDown={handleSwipeStart}
      onPointerUp={handleSwipeEnd}
      onPointerCancel={() => { swipeStartRef.current = null }}
      onClickCapture={handleSwipeClick}
    >
      
      <AppWarning 
      warningText={"Пользуйтесь только на одном устройстве, иначе данные могут не сохраниться"
      }/>

      <Header
        openInfoModal={() => setIsInfoOpen(true)} 
      />
      {/* <AppTaskCounter 
      activeCount={activeTasks.length} 
      completedCount={completedTasks.length} 
      progressPercent={progressPercent}
      /> */}
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

      <div className="task-lists flex-column">
        <p className="task-list-title">Active Tasks</p>

        {filteredActiveTasks.map((task) => (
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

        {filteredCompletedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            category={getCategoryById(task.categoryId)}
            onCheck={handleCheck}
            onEdit={openEditMode}
          />
        ))}
      </div>

      <BottonBar 
        openAddModal={() => openAddModal(activeCategory)}
        onAddCategory={openCreateCategoryModal}
      />
    </div>
  )
}

export default App
