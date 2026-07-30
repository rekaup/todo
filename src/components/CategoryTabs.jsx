import '../styles/components/CategoryTabs.css'

export default function CategoryTabs({ categories, activeId, onChange}) {
    return (
        <div className="category-tabs-container">
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