import { Plus, Check, Trash2 } from 'lucide-react';
import '../styles/AppModallAddTask.css'

export default function AppModalAddTask({ modalText, setModalText, handleSave, closeModal, modalMode, onDelete }) {
  const isEditMode = modalMode === 'edit'

  return (
        <div className="modal-overlay" onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()} className="modal">
              <div className="modal-handle"></div>
              <div className='modal-header'>
                <h3 className='modal-title'>{isEditMode ? 'Edit task' : 'Add new task'}</h3>
                <button onClick={closeModal} className='modal-button-close'>Cancel</button>
              </div>
              <div className='modal-body'>
                <div className='body-input'>
                  <button onClick={handleSave} className='modal-button-add'>
                    {isEditMode ? <Check size={20} /> : <Plus size={20} />}
                  </button>
                  <input 
                    placeholder={isEditMode ? 'Edit your task' : 'Enter a new task'}
                    value={modalText}
                    onChange={(e) => setModalText(e.target.value)}
                    className='modal-input'
                    autoFocus
                  />
                </div>
                <div>
                  {isEditMode && (
                      <button onClick={onDelete} className='delete-button'>
                        <Trash2 size={18} /> <p>Delete</p>
                      </button>
                  )}
                </div>
            </div>
          </div>
        </div>
  )
}