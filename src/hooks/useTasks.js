import { useState, useEffect } from "react";
import initialTasks from "../task";
import { getCloudStorage } from "./cloudStorage";


export function useTasks() {
    const [tasks, setTasks] = useState(initialTasks)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
    const cloudStorage = getCloudStorage()

    if (cloudStorage) {
        try {
        cloudStorage.getItem('tasks', (err, value) => {
            if (!err && value) {
            setTasks(JSON.parse(value))
            }
            setIsLoaded(true)
        })
        } catch (e) {
        console.warn('CloudStorage недоступен, используется localStorage', e)
        const savedTasks = localStorage.getItem('tasks')
        if (savedTasks) setTasks(JSON.parse(savedTasks))
        setIsLoaded(true)
        }
    } else {
        const savedTasks = localStorage.getItem('tasks')
        if (savedTasks) setTasks(JSON.parse(savedTasks))
        setIsLoaded(true)
    }
    }, [])

    useEffect(() => {
      if (!isLoaded) return

      const json = JSON.stringify(tasks)
      const cloudStorage = getCloudStorage()

      if (cloudStorage) {
        cloudStorage.setItem('tasks', json)
      } else {
        localStorage.setItem('tasks', json)
      }
    }, [tasks, isLoaded])

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

    function addTask(text, categoryId) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false,
            categoryId,
        }

        setTasks(prev => [...prev, newTask])
    }

    function editTask(id, newText, categoryId){
        const newTasks = tasks.map((task) => task.id === id ? {...task, text: newText, categoryId,} : task)
        setTasks(newTasks)
    }

    function clearCategoryFromTasks(categoryId) {
    setTasks(prev =>
        prev.map(task =>
        task.categoryId === categoryId ? { ...task, categoryId: null } : task
        )
    )
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
    clearCategoryFromTasks,
  }
}