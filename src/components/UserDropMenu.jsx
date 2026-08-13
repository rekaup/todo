import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Info } from 'lucide-react'
import '../styles/components/Header.css'
import '../styles/components/DropMenu.css'
import { useTelegramUser } from '../hooks/useTelegramUser'

export default function UserDropMenu({ openInfoModal }) {
    const user = useTelegramUser()

    return (
        <div className="user-menu">
            <Menu>
                {({ open }) => (
                    <>
                        {open && <div className="user-menu-overlay" aria-hidden="true" />}

                        <MenuButton className={({ open: isOpen }) => isOpen
                            ? 'user-menu-button active'
                            : 'user-menu-button'}
                        >
                            {user?.photo_url ? (
                                <img src={user.photo_url} alt={user.first_name} className="user-avatar" />
                            ) : (
                                <div className="user-avatar-fallback">
                                    {user?.first_name?.[0] ?? '?'}
                                </div>
                            )}
                        </MenuButton>

                        <MenuItems className="user-menu-items drop-menu">
                            <MenuItem>
                                <button type="button" className="user-menu-item drop-menu-item" onClick={openInfoModal}>
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