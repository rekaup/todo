import { useEffect, useState } from "react"
import '../styles/components/Modal.css'

const COLOR_PALETTE = [
    "#4d2b9c",
    "#2962ff",
    "#00b894",
    "#ff7675",
    "#fdcb6e",
    "#6c5ce7",
    "#2d3436",
    "#0984e3",
]

export default function CategoryManagerContent({ onCreate, onUpdate, editingCategory, closeModal }) {
    const [newName, setNewName] = useState('')
    const [newColor, setNewColor] = useState(COLOR_PALETTE[0])
    const isEditing = Boolean(editingCategory)

    useEffect(() => {
        if (!editingCategory) {
            setNewName('')
            setNewColor(COLOR_PALETTE[0])
            return
        }

        setNewName(editingCategory.name)
        setNewColor(editingCategory.color ?? COLOR_PALETTE[0])
    }, [editingCategory])

    const handleSave = () => {
        if (!newName.trim()) return

        if (isEditing) {
            onUpdate(editingCategory.id, newName.trim(), newColor)
        } else {
            onCreate(newName.trim(), newColor)
        }

        setNewName('')
        closeModal()
    }

    return (
        <>
            <div className="modal-header">
                <h3 className="modal-title">{isEditing ? 'Rename Category' : 'Create Category'}</h3>
            </div>
            <div className="modal-body">
                <textarea
                    type="text"
                    placeholder={isEditing ? "Rename category" : "Category name"}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="input-create-form"
                    autoFocus
                />

                <div className="button-container">
                    <button type='button' className="modal-button add flex-center w-full" onClick={handleSave}>
                        {isEditing ? 'Save' : 'Add'}
                    </button>
                    {isEditing ? (
                        <button type='button' className="modal-button cancel flex-center w-full" onClick={closeModal}>
                            Cancel
                        </button>
                    ) : (
                        <button type='button' className="modal-button cancel flex-center w-full" onClick={closeModal}>
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}