export const toLocalISOString = (date: Date): string => {
    const tzoffset = date.getTimezoneOffset() * 60000 // offset in milloseconds
    const localISOTime = new Date(date.getTime() - tzoffset).toISOString()

    return localISOTime
}