import {X, User, ChevronRight  } from 'lucide-react'
import '../styles/components/Modal.css'
import '../styles/components/Header.css'
import Divider from '../layout/Divider'

export default function AppInfoContent() {
    return(
        <>
            <div className='modal-header info'>
                <div className='modal-ifno-container'>
                    <h3 className='modal-title'>Todo app</h3>
                    <p className='app-version'>v{__APP__VERSION__}</p>
                    <p className='modal-text info'>A simple task management app right in Telegram</p>
                </div>
            </div>
            <div className='modal-body'>
                <div className='modal-info-link'>
                    <div className='modal-info-link right'>
                        <User />
                        <p>Author</p>
                    </div>
                    <p>@akine_999</p>
                </div>
                {/* <Divider />
                <div className='modal-info-link'>
                    <div className='modal-info-link right'>
                        <img src='src\image\GitHub_Invertocat_White.png' className='info-ico'/>
                        <p>Github</p>
                    </div>
                    <ChevronRight/>
                </div>
                <Divider />
                <div className='modal-info-link'>
                    <div className='modal-info-link right'>
                        <img src='src\image\tg icon.png' className='info-ico'/>
                        <p>Feedback</p>
                    </div>
                    <ChevronRight/>
                </div> */}
            </div>
        </>
    )
}