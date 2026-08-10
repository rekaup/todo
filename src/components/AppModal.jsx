import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useRef, useState } from 'react'
import '../styles/components/Modal.css'

export default function AppModal({ isOpen, onClose, children }) {
  const [dragOffset, setDragOffset] = useState(0)
  const dragStartRef = useRef(null)
  const dragOffsetRef = useRef(0)

  const handlePointerDown = (event) => {
    if (!event.isPrimary) return

    event.currentTarget.setPointerCapture(event.pointerId)
    dragStartRef.current = event.clientY
    dragOffsetRef.current = 0
  }

  const handlePointerMove = (event) => {
    if (dragStartRef.current === null) return

    const offset = Math.max(0, event.clientY - dragStartRef.current)
    dragOffsetRef.current = offset
    setDragOffset(offset)
  }

  const handlePointerUp = (event) => {
    if (dragStartRef.current === null) return

    const shouldClose = dragOffsetRef.current > 100
    dragStartRef.current = null
    dragOffsetRef.current = 0
    setDragOffset(0)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (shouldClose) onClose()
  }

  const cancelDrag = () => {
    dragStartRef.current = null
    dragOffsetRef.current = 0
    setDragOffset(0)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="modal-dialog" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="modal-overlay-enter"
          enterFrom="modal-overlay-enter-from"
          enterTo="modal-overlay-enter-to"
          leave="modal-overlay-leave"
          leaveFrom="modal-overlay-leave-from"
          leaveTo="modal-overlay-leave-to"
        >
          <div className="modal-overlay" />
        </Transition.Child>

        <div className="modal-shell">
          <Transition.Child
            as={Fragment}
            enter="modal-panel-enter"
            enterFrom="modal-panel-enter-from"
            enterTo="modal-panel-enter-to"
            leave="modal-panel-leave"
            leaveFrom="modal-panel-leave-from"
            leaveTo="modal-panel-leave-to"
          >
            <Dialog.Panel
              className="modal flex-column"
              style={dragOffset > 0 ? { transform: `translateY(${dragOffset}px)` } : undefined}
            >
              <div
                className="modal-handle"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={cancelDrag}
              />
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}