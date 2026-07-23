import '../styles/AppHeader.css'

export default function Header(user) {
    return(<header className='app-header'>
        <h1 className='header-title'>todo {user}</h1>
        <p className='app-version'>v{__APP__VERSION__}</p>
    </header>
    )
}