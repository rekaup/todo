import '../styles/Modal.css'

export default function AppModal({ isOpen, onClose, children}) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle"></div>
        {children}
      </div>
    </div>
  )
}