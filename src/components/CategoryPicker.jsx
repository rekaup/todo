import { useState } from "react"
import { Check, Plus, X } from "lucide-react"
import '../styles/components/CategoryPicker.css'

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

export default function CategoryPicker({categories, selectedId, onSelect, onCreate, onDeleteCategory }) {
    const [isCreating, setIsCreating] = useState(false)
    const [newName, setNewName] = useState('')
    const [newColor, setNewColor] = useState(COLOR_PALETTE[0])

    const handleCreate = () => {
        if (!newName.trim()) return
        const created = onCreate(newName.trim(), newColor)
        onSelect(created.id)
        setIsCreating(false)
        setNewName('')
    }

    return(
        <div className="category-picker">
            <div className="category-picker main picker">
                {categories.map(cat => (
                <button
                    key={cat.id}
                    type="button"
                    onClick={() => onSelect(cat.id)}
                    className={selectedId === cat.id ? "button category active" : "button category"}
                >
                    <p>{cat.name}</p>
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteCategory(cat.id)
                        }}
                        className="button delete"
                    >
                        <X size={14}/>
                    </span>
                </button>
                ))}
                <button type="button" onClick={()=>setIsCreating(true)} className="button plus">
                    <Plus />
                </button>
            </div>
            <div className="category-picker main creater">
                {isCreating && (
                    <div className="category-create-form">
                        <input 
                        autoFocus
                        placeholder="321"
                        value={newName}
                        onChange={(e)=> setNewName(e.target.value)}
                        />
                        <div className="category-create-form color-picker">
                            {COLOR_PALETTE.map(color => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => setNewColor(color)}
                                className="button color-picker"
                                style={{background: color}}
                            >
                                {newColor === color && <Check size={16} />}
                            </button>
                            ))}
                        </div>
                        <button type="button" onClick={handleCreate} className="button add">
                            Add
                        </button>
                        <button type="button" onClick={()=>setIsCreating(false)} className="button cansel">
                            Censel
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}