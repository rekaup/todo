import { Edit3, Trash2 } from 'lucide-react'
import { createPortal } from 'react-dom'
import '../styles/components/CategoryTabs.css'
import '../styles/components/DropMenu.css'

export default function CategoryDropMenu({ category, position, onRename, onDelete, onClose }) {
    if (!category || !position) return null

    return createPortal(
        <>
            <button
                type="button"
                className="category-menu-backdrop"
                aria-label="Close category menu"
                onClick={onClose}
            />
            <div className="category-menu-dimmer" />
            <div
                className="category-drop-menu drop-menu"
                style={{ top: position.top, left: position.left }}
                role="menu"
            >
                <button
                    type="button"
                    className="category-drop-menu-item drop-menu-item"
                    role="menuitem"
                    onClick={() => { onRename(category.id); onClose() }}
                >
                    <Edit3 size={16} />
                    <span>Rename</span>
                </button>
                <button
                    type="button"
                    className="category-drop-menu-item drop-menu-item danger"
                    role="menuitem"
                    onClick={() => { onDelete(category.id); onClose() }}
                >
                    <Trash2 size={16} />
                    <span>Delete</span>
                </button>
            </div>
        </>,
        document.body,
    )
}