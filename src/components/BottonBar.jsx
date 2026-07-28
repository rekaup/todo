import '../styles/components/BottonBar.css'
import { Plus, Info } from 'lucide-react'

export default function BottonBar({openAddModal}) {
    return (
        <div className='bottom-bar'>
            <button onClick={openAddModal} className='task-button flex-center add'>
                <Plus />
                <p>Add task</p>
            </button>
      </div>
    )
}