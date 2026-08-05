import { Plus, Check, Trash2, X } from 'lucide-react';
import { useRef, useLayoutEffect, useEffect } from 'react';
import Divider from "../layout/Divider"
import '../styles/components/Modal.css'
import CategoryPicker from './CategoryPicker';


export default function TaskModalContent({modalText, setModalText, handleSave, closeModal, modalMode, onDelete, categories, addCategory, selectedCategory, setSelectedCategory, onDeleteCategory, onOpenManager, onLongPressCategory}) {
    const isEditMode = modalMode === 'edit'
    const isAddMode = modalMode === 'add'
    const textareaRef = useRef(null)

    const resizeTextarea = (el) => {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    };

    const focusInputWhenKeyboardOpens = () => {
        const textarea = textareaRef.current
        if (!textarea) return

        window.requestAnimationFrame(() => {
            textarea.scrollIntoView({ block: 'center', behavior: 'smooth' })

            const viewport = window.visualViewport
            if (!viewport) {
                textarea.focus()
                return
            }

            const viewportBottom = viewport.height + viewport.offsetTop
            const textareaBottom = textarea.getBoundingClientRect().bottom
            if (textareaBottom > viewportBottom - 24) {
                window.scrollBy({ top: textareaBottom - viewportBottom + 24, behavior: 'smooth' })
            }

            textarea.focus()
        })
    }

    useLayoutEffect(() => {
        if (textareaRef.current) {
            resizeTextarea(textareaRef.current);
        }
    }, [modalText]);

    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        const focusTimer = window.requestAnimationFrame(() => {
            focusInputWhenKeyboardOpens()
        })

        const handleViewportChange = () => {
            focusInputWhenKeyboardOpens()
        }

        const viewport = window.visualViewport
        viewport?.addEventListener('resize', handleViewportChange)

        return () => {
            window.cancelAnimationFrame(focusTimer)
            viewport?.removeEventListener('resize', handleViewportChange)
        }
    }, [])

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
                onFocus={focusInputWhenKeyboardOpens}
                />
            </div>
            <CategoryPicker
                categories={categories}
                selectedId={selectedCategory}
                onSelect={setSelectedCategory}
                onDeleteCategory={onDeleteCategory}
                onOpenManager={onOpenManager}
                onLongPressCategory={onLongPressCategory}
            />
            <Divider />
            <div className='modal-action-bar'>
                <button onClick={handleSave} className={isEditMode ? 'modal-button edit flex-center w-full' : 'modal-button add flex-center w-full'}>
                    {isEditMode ? <span className='edit'><Check size={20} /> Complete</span> : <span className='add'><Plus size={20} />Add</span>}
                </button>
                {isAddMode && (
                    <button onClick={closeModal} className='modal-button cancel flex-center w-full'>Cancel</button>
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



              

