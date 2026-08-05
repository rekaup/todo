import { SquarePen } from 'lucide-react';
import { useRef } from 'react';
import '../styles/components/TaskItem.css'

export default function TaskItem({ task, onCheck, onDelete, onEdit }) {
    const longPressTimerRef = useRef(null)

    const clearLongPressTimer = () => {
        if (longPressTimerRef.current) {
            window.clearTimeout(longPressTimerRef.current)
            longPressTimerRef.current = null
        }
    }

    const handleLongPressStart = () => {
        longPressTimerRef.current = window.setTimeout(() => {
            onEdit(task)
            clearLongPressTimer()
        }, 420)
    }

    return (
        <div
            className={`task-item flex ${task.completed ? 'completed' : ''}`}
            onPointerDown={handleLongPressStart}
            onPointerUp={clearLongPressTimer}
            onPointerLeave={clearLongPressTimer}
            onPointerCancel={clearLongPressTimer}
            onContextMenu={(e) => e.preventDefault()}
        >
            <div className="task-text">
                <input
                    className="task-checkbox"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onCheck(task.id)}
                />
                <span className={`task-label ${task.completed ? 'completed' : ''}`}>
                    {task.text}
                </span>
            </div>
            <button className="edit-button" onClick={() => onEdit(task)}>
                <SquarePen size={20}/>
            </button>
        </div>
    )
}