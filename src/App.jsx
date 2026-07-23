import { useState, useEffect } from 'react'
import AppTaskCounter from './components/AppTaskCounter'
import TaskItem from './components/AppTaskItem'
import './styles/App.css'
import Header from './components/AppHeader'
import { useModal } from './hooks/useModal'
import { useTasks } from './hooks/useTasks'
import AppModal from './components/AppModal'
import TaskModalContent from './components/TaskModalContent'
import AppWarning from './components/AppWarning'
import { useTelegram } from './hooks/useTelegram'

function App() {
  const [newTaskText, setNewTaskText] = useState('')
  const [editTaskid, setEditTaskId] = useState(null)
  const [editTaskText, setEditTaskText] = useState('')

  const {modalMode, modalTaskId, modalText, setModalMode, setModalTaskId, setModalText, openAddModal, openEditMode, closeModal} = useModal()
  const {tasks, activeTasks, completedTasks, editTask, handleDelete, handleCheck, addTask} = useTasks()
  const totalTask = tasks.length
  const progressPercent = totalTask === 0 ? 0 : Math.round((completedTasks.length / totalTask) * 100)


  function handleSave() {
    if (modalText.trim() == '') return
    if (modalMode === 'add') {
      addTask(modalText)
    } else if(modalMode === 'edit') {
      editTask(modalTaskId, modalText)
    }
    closeModal()
  }

  return (
    <div className="main">
      
      <AppWarning 
      warningText={"Пользуйтесь только на одном устройстве, иначе данные могут не сохраниться"
      }/>

      <Header/>
      <AppTaskCounter 
      activeCount={activeTasks.length} 
      completedCount={completedTasks.length} 
      progressPercent={progressPercent}
      />

      <button onClick={openAddModal} className='add-task-button'>
        +
      </button>

      <AppModal isOpen={modalMode != null} onClose={closeModal}>
        <TaskModalContent
        modalText={modalText}
        setModalText={setModalText}
        handleSave={handleSave}
        closeModal={closeModal}
        modalMode={modalMode}
        onDelete={()=> {handleDelete(modalTaskId); closeModal()}}
        />
      </AppModal>

      <div className="task-lists">
        <p className='task-list-title'>Active Tasks</p>
        {activeTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onCheck={handleCheck}
          onDelete={handleDelete}
          onEdit={openEditMode}
        />
        ))}
      </div>

      <div className="task-lists">
        <p className='task-list-title'>Completed Tasks</p>
        {completedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onCheck={handleCheck}
          onDelete={handleDelete}
          onEdit={openEditMode}
        />
        ))}
      </div>
    </div>
  )
}

export default App
