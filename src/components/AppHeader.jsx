import '../styles/components/Header.css'
import '../styles/components/BottonBar.css'
import { Plus, Info } from 'lucide-react'


export default function Header({openInfoModal}) {
    return(<header className='app-header'>
        <div className='header-container flex-column'>
            <h1 className='header-title'>todo</h1>
        </div>
        <button onClick={openInfoModal} className='task-button flex-center info'>
            <Info />
        </button>
    </header>
    )
}