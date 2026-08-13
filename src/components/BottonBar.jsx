import '../styles/components/BottonBar.css'
import { FolderPlus, Plus , Info } from 'lucide-react'

export default function BottonBar({openAddModal, onAddCategory}) {
    return (
        <div className='bottom-bar'>
            <button className="task-button flex-center add-category" onClick={onAddCategory}>
                <FolderPlus  />
            </button>
            <button onClick={openAddModal} className='task-button flex-center add'>
                <Plus  />
                <p>Add task</p>
            </button>
      </div>
    )
}