import '../styles/components/Header.css'
import UserDropMenu from './UserDropMenu'

export default function Header({ openInfoModal }) {
    return (
        <header className='app-header'>
            {/* <h1 className='app-header title'>Todo</h1> */}
            <div className='flex-center info'>
                <UserDropMenu openInfoModal={openInfoModal}/>
            </div>
        </header>
    )
}