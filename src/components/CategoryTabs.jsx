import '../styles/components/CategoryTabs.css'
import { Plus } from 'lucide-react'


export default function CategoryTabs({ categories, activeId, onChange, onAddCategory}) {
    return (
        <div className="category-tabs-container">
            <button className="category-tabs-add" onClick={onAddCategory}>
            <Plus />
            </button>
            <button
            className={`category-tab ${activeId === null ? 'active' : ''}`}
            onClick={() => onChange(null)}
            >
                all
            </button>
            {categories.map(category => (
                <button
                    key={category.id}
                    onClick={() => onChange(category.id)}
                    className={activeId === category.id ? "category-tab active" : "category-tab"}
                >
                    {category.name}
                </button>
            ))}
        </div>
    )
}