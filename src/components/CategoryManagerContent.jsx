import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { RadioGroup } from '@headlessui/react'
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
                <h3 className="modal-title">{isEditing ? 'Edit Category' : 'Create Category'}</h3>
            </div>
            <div className="modal-body">
                <input
                    type="text"
                    placeholder="Category Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="input-create-form"
                />

                <RadioGroup value={newColor} onChange={setNewColor} className="category-create-form color-picker">
                    {COLOR_PALETTE.map((color) => (
                        <RadioGroup.Option
                            key={color}
                            value={color}
                            className="button color-picker"
                            style={{ backgroundColor: color }}
                        >
                            {({ checked }) => (
                                <span className="flex-center">
                                    {checked && <Check size={16} color="#fff" />}
                                </span>
                            )}
                        </RadioGroup.Option>
                    ))}
                </RadioGroup>

                <div className="button-container">
                    <button type='button' className="modal-button add flex-center w-full" onClick={handleSave}>
                        {isEditing ? 'Save' : 'Add'}
                    </button>
                    <button type='button' className="modal-button cancel flex-center w-full" onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}