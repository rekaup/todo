export function getCloudStorage() {
    const tg = window.Telegram?.WebApp
    if (!tg) return null
    const isSupported = tg.isVersionAtLeast ? tg.isVersionAtLeast('6.9') : false
    return isSupported ? tg.CloudStorage : null
}