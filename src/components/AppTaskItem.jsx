import { SquarePen } from 'lucide-react';
import "../styles/AppTaskItem.css"

export default function TaskItem({ task, onCheck, onDelete, onEdit }) {
    return (
        <div className="task-item">
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