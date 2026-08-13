import '../styles/components/Header.css'
import { useTelegramUser } from '../hooks/useTelegramUser'

export default function Header({ openInfoModal }) {
    const user = useTelegramUser()
    return (
        <header className='app-header'>
            <button onClick={openInfoModal} className='user-avatar-button'>
                {user?.photo_url? (
                    <img src={user.photo_url} alt={user.first_name} className='user-avatar'/>
                ) : (
                    <div className='user-avatar-fallback'>
                        {user?.first_name?.[0] ?? '?'}
                    </div>
                )}
            </button>
        </header>
    )
}