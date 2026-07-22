import { useState, useEffect } from 'react'
import initialTasks from './task'
import AppTaskCounter from './components/AppTaskCounter'
import TaskItem from './components/AppTaskItem'
import AppModalAddTask from './components/AppModalAddTask'
import './styles/App.css'
import Header from './components/AppHeader'


function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : initialTasks
  })
  const [newTaskText, setNewTaskText] = useState('')
  const activeTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)
  const [modalMode, setModalMode] = useState(null)
  const [modalTaskId, setModalTaskId] = useState(null)
  const [modalText, setModalText] = useState('') 
  const totalTask = tasks.length
  const progressPercent = totalTask === 0 ? 0 : Math.round((completedTasks.length / totalTask) * 100)
  const [editTaskid, setEditTaskId] = useState(null)
  const [editTaskText, setEditTaskText] = useState('')
  

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])


  function handleCheck(id) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(newTasks)
  }

  function handleDelete(id) {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
  }

  function handleAdd() {
    if (newTaskText.trim() === '') return

    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    }
    setTasks([...tasks, newTask])
    setNewTaskText('')
    setIsModalOpen(false)
  }

  function handleSave() {
    if (modalText.trim() === '') return

    if (modalMode === 'add') {
      const newTask = { id: Date.now(), text: modalText, completed: false }
      setTasks([...tasks, newTask])
    } else if (modalMode === 'edit') {
    const newTasks = tasks.map((task) =>
      task.id === modalTaskId ? { ...task, text: modalText } : task
      )
      setTasks(newTasks)
    }

    closeModal()
  }

  function startEditing(task) {
    setEditTaskId(task.id)
    setEditTaskText(task.text)
  }

  function saveEdit(id) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {...task, text: editTaskText}
      }
      return task
    })
    setTasks(newTasks)
    setEditTaskId(null)
  }

  function openAddModal() {
    setModalMode('add')
    setModalText('')
    setModalTaskId(null)
  }

  function openEditMode(task){
    setModalMode('edit')
    setModalText(task.text)
    setModalTaskId(task.id)
  }

  function closeModal() {
    setModalMode(null)
  }

  return (
    <div className="main">
      <Header />

      <AppTaskCounter 
      activeCount={activeTasks.length} 
      completedCount={completedTasks.length} 
      progressPercent={progressPercent}
      />

      <button onClick={openAddModal} className='add-task-button'>
        +
      </button>

      {modalMode && (
        <AppModalAddTask 
          modalText={modalText}
          setModalText={setModalText}
          handleSave={handleSave}
          closeModal={closeModal}
          modalMode={modalMode}
          onDelete={() => {handleDelete(modalTaskId); closeModal()}}
        />
      )}

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
