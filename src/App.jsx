import { useState, useEffect } from 'react'
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
  const { categories, addCategory, getCategoryById, deleteCategory } = useCategories();
  const { tasks, activeTasks, completedTasks, editTask, handleDelete, handleCheck, addTask, clearCategoryFromTasks } = useTasks();
  const totalTask = tasks.length
  const progressPercent = totalTask === 0 ? 0 : Math.round((completedTasks.length / totalTask) * 100)
  const [inInfoOpen, setIsInfoOpen] = useState(false)
  const [activeCategory, setAcriveCategory] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)
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
    if (activeCategory === id) setActiveCategory(null)
  }

  return (
    <div className="main">
      
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
      onChange={setAcriveCategory}
      onAddCategory={() => setIsCreatingCategory(true)}
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
        onOpenManager={() => setIsCreatingCategory(true)}
        />
      </AppModal>

            <AppModal isOpen={isCreatingCategory} onClose={() => setIsCreatingCategory(false)}>
        <CategoryManagerContent
          onCreate={addCategory}
          closeModal={() => setIsCreatingCategory(false)}
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
        openAddModal={openAddModal}
      />
    </div>
  )
}

export default App
