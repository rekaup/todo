import '../styles/components/CategoryTabs.css'
import '../styles/components/CategoryPicker.css'
import { RadioGroup } from '@headlessui/react'
import { Plus, SquarePen } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'

const ALL_VALUE = '__all__'

export default function CategoryTabs({ categories, activeId, onChange, onAddCategory, onDeleteCategory, onLongPressCategory }) {
    const selectedValue = activeId === null ? ALL_VALUE : activeId
    const longPressTimerRef = useRef({})
    const tabRefs = useRef({})
    const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0 })

    useLayoutEffect(() => {
        const selectedTab = tabRefs.current[selectedValue]
        if (!selectedTab) return

        setIndicatorStyle({
            width: selectedTab.offsetWidth,
            transform: `translateX(${selectedTab.offsetLeft}px)`,
            opacity: 1,
        })
    }, [selectedValue, categories])

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
                <span className="category-tabs-indicator" style={indicatorStyle} aria-hidden="true" />

                <RadioGroup.Option
                    value={ALL_VALUE}
                    ref={(element) => { tabRefs.current[ALL_VALUE] = element }}
                    className={({ checked }) => checked ? 'category-tab active' : 'category-tab'}
                >
                    {() => <span>all</span>}
                </RadioGroup.Option>

                {categories.map(category => (
                    <RadioGroup.Option
                        key={category.id}
                        value={category.id}
                        ref={(element) => { tabRefs.current[category.id] = element }}
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

                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </RadioGroup>
        </div>
    )
}