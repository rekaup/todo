import { Plus, Check, Trash2, X } from 'lucide-react';
import { useRef, useLayoutEffect } from 'react';
import Divider from "../layout/Divider"
import CategoryPicker from './CategoryPicker';
import '../styles/components/Modal.css'



export default function TaskModalContent({modalText, setModalText, handleSave, closeModal, modalMode, onDelete, categories, addCategory, selectedCategory, setSelectedCategory}) {
    const isEditMode = modalMode === 'edit'
    const isAddMode = modalMode === 'add'
    const textareaRef = useRef(null)

    const resizeTextarea = (el) => {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    };

    useLayoutEffect(() => {
        if (textareaRef.current) {
            resizeTextarea(textareaRef.current);
        }
    }, [modalText]);

    const handleModalTextChange = (e) => {
        setModalText(e.target.value);
        resizeTextarea(e.target);
    };

    return(
    <>
        <div className='modal-header'>
            <h3 className='modal-title'>{isEditMode ? 'Edit task' : 'Add new task'}</h3>
        </div>

        <div className='modal-body'>
            <div className='body-input'>
                <textarea 
                ref={textareaRef}
                placeholder={isEditMode ? 'Edit your task' : 'Enter a new task'}
                value={modalText}
                onChange={handleModalTextChange}
                className='modal-input w-full'
                autoFocus
                />
            </div>
            <CategoryPicker
                categories={categories}
                selectedId={selectedCategory}
                onSelect={setSelectedCategory}
                onCreate={addCategory}
            />
            <Divider />
            <div className='modal-action-bar'>
                <button onClick={handleSave} className={isEditMode ? 'modal-button edit flex-center w-full' : 'modal-button add flex-center w-full'}>
                    {isEditMode ? <span className='edit'><Check size={20} /> Complete</span> : <span className='add'><Plus size={20} />Add</span>}
                </button>
                {isAddMode && (
                    <button onClick={closeModal} className='modal-button censel flex-center w-full'>Cancel</button>
                )}
                {isEditMode && 
                    <button onClick={onDelete} className='modal-button delete flex-center w-full'>
                        <span><Trash2 size={18} /> <p>Delete</p></span>
                    </button>
                }
            </div>
        </div>
    </>
    )
}



              

