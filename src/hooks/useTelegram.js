import { useMemo } from "react";

export function useTelegram() {
    return useMemo(() => {
        const tg = window.Telegram?.WebApp;

        return {
            tg,
            userTg: tg?.initDataUnsafe?.user ?? null,
        };
    }, []);
}