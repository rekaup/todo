import { Plus } from "lucide-react"
import { RadioGroup } from '@headlessui/react'
import '../styles/components/CategoryPicker.css'
import { useRef } from 'react'

export default function CategoryPicker({ categories, selectedId, onSelect, onOpenManager, onLongPressCategory }) {
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
        <div className="category-picker">
            <RadioGroup
                value={selectedId}
                onChange={(value) => onSelect(selectedId === value ? null : value)}
                className="category-picker-list"
            >
                <button type="button" className="button plus" onClick={onOpenManager}>
                    <Plus />
                </button>

                {categories.map((category) => (
                    <RadioGroup.Option
                        key={category.id}
                        value={category.id}
                        className={({ checked }) =>
                            checked ? 'button category active' : 'button category'
                        }
                        onPointerDown={() => handleLongPressStart(category.id)}
                        onPointerUp={() => clearLongPressTimer(category.id)}
                        onPointerLeave={() => clearLongPressTimer(category.id)}
                        onPointerCancel={() => clearLongPressTimer(category.id)}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        {({ checked }) => (
                            <span>{category.name}</span>
                        )}
                    </RadioGroup.Option>
                ))}
            </RadioGroup>
        </div>
    )
}