import '../styles/components/Header.css'
import '../styles/components/BottonBar.css'
import UserDropMenu from './UserDropMenu'

export default function Header({ openInfoModal }) {
    return (
        <header className='app-header'>
            <div className='header-container flex-column'>
                <h1 className='header-title'>todo</h1>
            </div>
            <div className='flex-center info'>
                <UserDropMenu openInfoModal={openInfoModal} />
            </div>
        </header>
    )
}