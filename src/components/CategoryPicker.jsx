import { useState } from "react"
import { Check, Plus } from "lucide-react"

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

export default function CategoryPicker({categories, selectedId, onSelect, onCreate }) {
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
        <div>
            <h1>321</h1>
            <div>
                {categories.map(cat => (
                <button
                    key={cat.id}
                    type="button"
                    onClick={() => onSelect(cat.id)}
                    className={selectedId === cat.id ? "active" : ""}
                >
                    {cat.name}
                </button>
                ))}
                <button type="button" onClick={()=>setIsCreating(true)}>
                    <Plus />
                </button>
                {isCreating && (
                    <div>
                        <input 
                        autoFocus
                        placeholder="321"
                        value={newName}
                        onChange={(e)=> setNewName(e.target.value)}
                        />
                        <div>
                            {COLOR_PALETTE.map(color => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => setNewColor(color)}
                                style={{
                                    background: color,
                                    width: 28,
                                    height: 28,
                                    borderRadius: "50%",
                                    border:
                                        newColor === color
                                            ? "2px solid white"
                                            : "none"
                                }}
                            >
                                {newColor === color && <Check size={16} />}
                            </button>
                            ))}
                        </div>
                        <button type="button" onClick={handleCreate}>
                            Add
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}