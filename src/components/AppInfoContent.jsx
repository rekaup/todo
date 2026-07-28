import {X, User, ChevronRight  } from 'lucide-react'
import { FaTelegramPlane, FaGithub } from "react-icons/fa";
import '../styles/components/Modal.css'
import '../styles/components/Header.css'
import Divider from '../layout/Divider'

export default function AppInfoContent() {
    function openTelegramProfile(username) {
        const tg = window.Telegram?.WebApp
        const url = `https://t.me/${username}`
        if (tg) {
            tg.openTelegramLink(url)
        } else {
            window.open(url, '_blank')
        }
    }
    function openExternalLink(url) {
        const tg = window.Telegram?.WebApp
        if(tg) {
            tg.openLink(url)
        } else {
            window.open(url, '_blank')
        }
    }


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
                <div className='modal-info-link' onClick={()=>openTelegramProfile('akine_999')}>
                    <div className='modal-info-link right'>
                        <User className='un-active'/>
                        <p>Author</p>
                    </div>
                    <p className='un-active'>@akine_999</p>
                </div>
                <Divider />
                <div className='modal-info-link' onClick={()=>openExternalLink('https://github.com/rekaup/todo')}>
                    <div className='modal-info-link right'>
                        <FaGithub size={24} className='un-active'/>
                        <p>Github</p>
                    </div>
                    <ChevronRight className='un-active'/>
                </div>
                {/* <Divider />
                <div className='modal-info-link'>
                    <div className='modal-info-link right'>
                        <FaTelegramPlane size={24} className='un-active'/>
                        <p>Feedback</p>
                    </div>
                    <ChevronRight className='un-active'/>
                </div> */}
            </div>
        </>
    )
}