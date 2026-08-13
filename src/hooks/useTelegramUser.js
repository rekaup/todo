import { useEffect, useState } from "react"

export function useTelegramUser() {
    const [user, setUser] = useState(null)

    useEffect(()=> {
        const tg = window.Telegram?.WebApp
        if (!tg) return
        
        tg.ready()
        const tgUser = tg.initDataUnsafe?.user
        if (tgUser) {
            setUser(tgUser)
        }
    }, [])

    return user
}