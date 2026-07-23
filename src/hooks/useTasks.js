import { useState, useEffect } from "react";
import initialTasks from "../task";

export function useTasks() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks')
        return savedTasks ? JSON.parse(savedTasks) : initialTasks
    })
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

    function addTask(text) {
        const newTask = {id: Date.now(), text, completed: false}
        setTasks([...tasks, newTask])
    }

    function editTask(id, newText){
        const newTasks = tasks.map((task) => task.id === id ? {...task, text: newText} : task)
        setTasks(newTasks)
    }
  
  const activeTasks = tasks.filter((task)=> !task.completed)
  const completedTasks = tasks.filter((task)=> task.completed)

  return {
    tasks,
    activeTasks,
    completedTasks,
    editTask,
    handleDelete,
    handleCheck,
    addTask,
  }
}
