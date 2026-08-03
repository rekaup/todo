import { useState } from "react"
import { Check, Plus} from "lucide-react"
import '../styles/components/CategoryPicker.css'
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
];

export default function CategoryManagerContent({onCreate, closeModal, onOpenManager}) {
    const [newName, setNewName] = useState('')
    const [newColor, setNewColor] = useState(COLOR_PALETTE[0])

    const handleCreate = () => {
        if (!newName.trim()) return
        const created = onCreate(newName.trim(), newColor)
        setNewName('')
        closeModal()
    }

    return(
        <>
            <div className="modal-header">
                <h3 className="modal-title">Create Category</h3>
            </div>
            <div className="modal-body">
                <input
                    type="text"
                    placeholder="Category Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="input-create-form"
                />
                {/* <div className="category-create-form color-picker">
                    {COLOR_PALETTE.map((color) => (
                        <button
                            key={color}
                            type="button"
                            className="button color-picker"
                            style={{ backgroundColor: color }}
                            onClick={() => setNewColor(color)}
                        >
                            {newColor === color && <Check size={16} color="#fff" />}
                        </button>
                    ))}
                </div> */}
                <div className="button-container">
                    <button type='button' className="modal-button add flex-center w-full" onClick={handleCreate}>
                        Add
                    </button>
                    <button type='button' className="modal-button cancel flex-center w-full" onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}