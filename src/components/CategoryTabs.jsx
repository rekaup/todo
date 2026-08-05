import '../styles/components/CategoryTabs.css'
import '../styles/components/CategoryPicker.css'
import { RadioGroup } from '@headlessui/react'
import { Plus, X } from 'lucide-react'
import { useRef } from 'react'

const ALL_VALUE = '__all__'

export default function CategoryTabs({ categories, activeId, onChange, onAddCategory, onDeleteCategory, onLongPressCategory }) {
    const selectedValue = activeId === null ? ALL_VALUE : activeId
    const longPressTimerRef = useRef({})

    const clearLongPressTimer = (categoryId) => {
        const timer = longPressTimerRef.current[categoryId]
        if (timer) {
            window.clearTimeout(timer)
            delete longPressTimerRef.current[categoryId]
        }
    }

    const handleLongPressStart = (categoryId) => {
        const timer = window.setTimeout(() => {
            onLongPressCategory?.(categoryId)
            clearLongPressTimer(categoryId)
        }, 420)

        longPressTimerRef.current[categoryId] = timer
    }

    return (
        <div className="category-tabs-container">
            <button className="category-tabs-add" onClick={onAddCategory}>
                <Plus />
            </button>

            <RadioGroup
                value={selectedValue}
                onChange={(value) => onChange(value === ALL_VALUE ? null : value)}
                className="category-tabs-list"
            >
                <RadioGroup.Option
                    value={ALL_VALUE}
                    className={({ checked }) => checked ? 'category-tab active' : 'category-tab'}
                >
                    {() => <span>all</span>}
                </RadioGroup.Option>

                {categories.map(category => (
                    <RadioGroup.Option
                        key={category.id}
                        value={category.id}
                        className={({ checked }) => checked ? 'category-tab active' : 'category-tab'}
                        onPointerDown={() => handleLongPressStart(category.id)}
                        onPointerUp={() => clearLongPressTimer(category.id)}
                        onPointerLeave={() => clearLongPressTimer(category.id)}
                        onPointerCancel={() => clearLongPressTimer(category.id)}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        {({ checked }) => (
                            <>
                                <span>{category.name}</span>
                                {checked && (
                                    <span
                                        className="category-tab-delete"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onDeleteCategory(category.id)
                                        }}
                                    >
                                        <X size={14} />
                                    </span>
                                )}
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </RadioGroup>
        </div>
    )
}