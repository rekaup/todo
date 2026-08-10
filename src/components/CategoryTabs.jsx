import '../styles/components/CategoryTabs.css'
import '../styles/components/CategoryPicker.css'
import { RadioGroup } from '@headlessui/react'
import { Plus } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import CategoryDropMenu from './CategoryDropMenu'

const ALL_VALUE = '__all__'

export default function CategoryTabs({ categories, activeId, onChange, onAddCategory, onDeleteCategory, onLongPressCategory }) {
    const selectedValue = activeId === null ? ALL_VALUE : activeId
    const longPressTimerRef = useRef({})
    const tabRefs = useRef({})
    const listRef = useRef(null)
    const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0 })
    const [menuState, setMenuState] = useState(null)

    useLayoutEffect(() => {
        const selectedTab = tabRefs.current[selectedValue]
        if (!selectedTab) return

        setIndicatorStyle({
            width: selectedTab.offsetWidth,
            transform: `translateX(${selectedTab.offsetLeft}px)`,
            opacity: 1,
        })

        const list = listRef.current
        if (list) {
            const listRect = list.getBoundingClientRect()
            const selectedRect = selectedTab.getBoundingClientRect()
            const targetScrollLeft = list.scrollLeft
                + selectedRect.left
                - listRect.left
                - (list.clientWidth - selectedRect.width) / 2

            list.scrollTo({
                left: Math.max(0, targetScrollLeft),
                behavior: 'smooth',
            })
        }
    }, [selectedValue, categories])

    const clearLongPressTimer = (categoryId) => {
        const timer = longPressTimerRef.current[categoryId]
        if (timer) {
            window.clearTimeout(timer)
            delete longPressTimerRef.current[categoryId]
        }
    }

    const handleLongPressStart = (categoryId, event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const timer = window.setTimeout(() => {
            setMenuState({
                categoryId,
                position: {
                    top: rect.bottom + 8,
                    left: Math.min(rect.left, window.innerWidth - 180),
                },
                target: {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                },
            })
            clearLongPressTimer(categoryId)
        }, 420)

        longPressTimerRef.current[categoryId] = timer
    }

    return (
        <>
        <div className="category-tabs-container">
            <button className="category-tabs-add" onClick={onAddCategory}>
                <Plus />
            </button>

            <RadioGroup
                value={selectedValue}
                onChange={(value) => onChange(value === ALL_VALUE ? null : value)}
                className="category-tabs-list"
                ref={listRef}
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
                        onPointerDown={(event) => handleLongPressStart(category.id, event)}
                        onPointerUp={() => clearLongPressTimer(category.id)}
                        onPointerLeave={() => clearLongPressTimer(category.id)}
                        onPointerCancel={() => clearLongPressTimer(category.id)}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        {() => (
                            <>
                                <span>{category.name}</span>

                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </RadioGroup>
        </div>
        <CategoryDropMenu
            category={categories.find(category => category.id === menuState?.categoryId)}
            position={menuState?.position}
            target={menuState?.target}
            onRename={(categoryId) => onLongPressCategory?.(categoryId)}
            onDelete={(categoryId) => onDeleteCategory?.(categoryId)}
            onClose={() => setMenuState(null)}
        />
        </>
    )
}