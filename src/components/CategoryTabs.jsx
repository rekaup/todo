export default function CategoryTabs({ categories, activeId, onChange}) {
    return (
        <div>
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
                    className={activeId === category.id ? "active" : ""}
                >
                    {category.name}
                </button>
            ))}
        </div>
    )
}