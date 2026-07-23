import { useState } from "react";

export function useModal() {
    const [modalMode, setModalMode] = useState(null)
    const [modalTaskId, setModalTaskId] = useState(null)
    const [modalText, setModalText] = useState('')

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

    return {
        modalMode,
        modalTaskId,
        modalText,
        setModalMode,
        setModalTaskId,
        setModalText,
        openAddModal,
        openEditMode,
        closeModal,
    }
}