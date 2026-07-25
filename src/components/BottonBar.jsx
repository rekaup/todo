import '../styles/components/BottonBar.css'
import { Plus } from 'lucide-react'

export default function BottonBar({openAddModal}) {
    return (
        <div className='bottom-bar'>
            <button onClick={openAddModal} className='add-task-button'>
                <Plus />
            </button>
      </div>
    )
}