import '../styles/AppHeader.css'

export default function Header(userTg) {
    return(<header className='app-header'>
        <h1 className='header-title'>todo {userTg.username}</h1>
        <p className='app-version'>v{__APP__VERSION__}</p>
    </header>
    )
}