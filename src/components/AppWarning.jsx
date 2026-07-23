import { TriangleAlert } from 'lucide-react';
import '../styles/App.css'

export default function AppWarning({warningText}) {
    return(<div className='app-warning'>
        <TriangleAlert />
        <p className='warning-text'>{warningText}</p>
    </div>
    )
}