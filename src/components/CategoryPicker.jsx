import { X, Plus } from "lucide-react"
import '../styles/components/CategoryPicker.css'



export default function CategoryPicker({categories, selectedId, onSelect, onDeleteCategory, onOpenManager}) {

    return(
        <div className="category-picker">
            <div className="category-picker main picker">
                <button type="button" className="button plus" onClick={onOpenManager}>
                    <Plus />
                </button>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        type="button"
                        className={selectedId === category.id ? "button category active" : "button category"}
                        onClick={selectedId === category.id ? () => onSelect(null) : () => onSelect(category.id)}
                    >
                        <p>{category.name}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}