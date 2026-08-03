import '../styles/components/CategoryTabs.css'
import '../styles/components/CategoryPicker.css'
import { Plus, X } from 'lucide-react'


export default function CategoryTabs({ categories, activeId, onChange, onAddCategory, onDeleteCategory }) {
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
                    {activeId === category.id && (
                        <span
                            className={activeId === category.id ? "category-tab-delete active" : "category-tab-delete"}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteCategory(category.id);
                            }}
                        >
                            <X size={14} />
                        </span>
                    )}
                </button>
            ))}
        </div>
    )
}