import {X} from 'lucide-react'
import '../styles/components/Modal.css'

export default function AppInfoContent() {
    return(
        <>
            <div className='modal-header'>
                <h3 className='modal-title'>About todo</h3>
            </div>
            <div className='modal-body'>
                <div className='modal-info-container'>
                    <h3 className='modal-title'>Todo app</h3>
                    <p className='modal-info-text'>by @akine_999</p>
                </div>
                <p>text text</p>
            </div>
        </>
    )
}