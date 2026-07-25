import '../styles/components/BottonBar.css'
import { Plus, Info } from 'lucide-react'

export default function BottonBar({openAddModal, openInfoModal}) {
    return (
        <div className='bottom-bar'>
            <button onClick={openInfoModal} className='task-button flex-center'>
                <Info />
            </button>
            <button onClick={openAddModal} className='task-button flex-center add'>
                <Plus />
            </button>
      </div>
    )
}