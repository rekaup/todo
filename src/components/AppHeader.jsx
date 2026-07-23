import '../styles/AppHeader.css'

export default function Header() {
    return(<header className='app-header'>
        <h1 className='header-title'>todo</h1>
        <p className='app-version'>v{__APP__VERSION__}</p>

        <p style={{color: 'red', fontSize: '10px'}}>
        CloudStorage: {window.Telegram?.WebApp?.CloudStorage ? 'есть' : 'нет'}
        </p>
    </header>
    )
}