import { Edit3, Trash2 } from 'lucide-react'
import { createPortal } from 'react-dom'
import '../styles/components/CategoryTabs.css'

export default function CategoryDropMenu({ category, position, target, onRename, onDelete, onClose }) {
    if (!category || !position || !target) return null

    return createPortal(
        <>
            <button
                type="button"
                className="category-menu-backdrop"
                aria-label="Close category menu"
                onClick={onClose}
            />
            <div
                className="category-menu-target"
                style={{
                    top: target.top,
                    left: target.left,
                    width: target.width,
                    height: target.height,
                }}
                aria-hidden="true"
            />
            <div
                className="category-drop-menu"
                style={{ top: position.top, left: position.left }}
                role="menu"
            >
                <button
                    type="button"
                    className="category-drop-menu-item"
                    role="menuitem"
                    onClick={() => {
                        onRename(category.id)
                        onClose()
                    }}
                >
                    <Edit3 size={16} />
                    <span>Rename</span>
                </button>
                <button
                    type="button"
                    className="category-drop-menu-item danger"
                    role="menuitem"
                    onClick={() => {
                        onDelete(category.id)
                        onClose()
                    }}
                >
                    <Trash2 size={16} />
                    <span>Delete</span>
                </button>
            </div>
        </>,
        document.body,
    )
}
