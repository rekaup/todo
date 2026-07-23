import { TriangleAlert } from 'lucide-react';
import '../styles/App.css'

export default function AppWarning() {
    return(<div className='app-warning'>
        <TriangleAlert />
        <p className='warning-text'>Пользуйтесь только на одном устройстве, иначе данные могут не сохраниться</p>
    </div>
    )
}