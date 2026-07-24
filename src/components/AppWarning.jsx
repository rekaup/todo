import { TriangleAlert, X } from 'lucide-react';
import { useState } from 'react';
import '../styles/components/App.css'
import '../styles/utilities.css'

export default function AppWarning({warningText}) {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null;

    return(
    <div className='app-warning flex-center'>
        <div className='warning-left-side flex-center'> 
            <TriangleAlert className='warning-ico'/>
        </div>
        <p className='warning-text'>{warningText}</p>
        <button onClick={()=> setIsVisible(false)} className='warning-close'>
            <X size={17}/>
        </button>
    </div>
    )
}