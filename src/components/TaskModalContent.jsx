import { Plus, Check, Trash2 } from 'lucide-react';
import '../styles/Modal.css'
import { useRef, useEffect } from 'react';

export default function TaskModalContent({modalText, setModalText, handleSave, closeModal, modalMode, onDelete}) {
    const isEditMode = modalMode === 'edit'
    const textareaRef = useRef(null)
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '0px';
            const newHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = newHeight + 'px';
        }
    }, [modalText]);

    const handleModalTextChange = (e) => {
        setModalText(e.target.value);
        e.target.style.height = '0px';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    return(
    <>
        <div className='modal-header'>
            <h3 className='modal-title'>{isEditMode ? 'Edit task' : 'Add new task'}</h3>
            <button onClick={closeModal} className='modal-button-close'>Cancel</button>
        </div>

        <div className='modal-body'>
            <div className='body-input'>
                <textarea 
                rows={1}
                placeholder={isEditMode ? 'Edit your task' : 'Enter a new task'}
                value={modalText}
                onChange={handleModalTextChange}
                className='modal-input'
                autoFocus
                />
            </div>
            <div className='modal-action-bar'>
                {isEditMode && (
                    <button onClick={onDelete} className='modal-button delete'>
                    <span><Trash2 size={18} /> <p>Delete</p></span>
                    </button>
                )}
                    <button onClick={handleSave} className='modal-button'>
                        {isEditMode ? <span className='edit'><Check size={20} /> Complete</span> : <span className='add'><Plus size={20} />Add</span>}
                    </button>
            </div>
        </div>
    </>
    )
}



              

