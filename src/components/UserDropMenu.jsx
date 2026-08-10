import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Info, LogOut, User } from 'lucide-react'
import '../styles/components/Header.css'

export default function UserDropMenu({ openInfoModal }) {
    return (
        <div className="user-menu">
            <Menu>
                {({ open }) => (
                    <>
                        {open && <div className="user-menu-overlay" aria-hidden="true" />}

                        <MenuButton className={({ open: isOpen }) => isOpen
                            ? 'task-button flex-center info user-menu-button active'
                            : 'task-button flex-center info user-menu-button'}
                        >
                            <User />
                        </MenuButton>

                        <MenuItems className="user-menu-items">
                            <MenuItem>
                                <button type="button" className="user-menu-item" onClick={openInfoModal}>
                                    <Info size={16} />
                                    <span className="menu-label">Info</span>
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </>
                )}
            </Menu>
        </div>
    )
}