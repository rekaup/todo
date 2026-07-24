import { TriangleAlert, X } from 'lucide-react';
import '../styles/App.css'
import { useState } from 'react';

export default function AppWarning({warningText}) {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null;

    return(
    <div className='app-warning'>
        <div className='warning-left-side'> 
            <TriangleAlert className='warning-ico'/>
        </div>
        <p className='warning-text'>{warningText}</p>
        <button onClick={()=> setIsVisible(false)} className='warning-close'>
            <X size={17}/>
        </button>
    </div>
    )
}