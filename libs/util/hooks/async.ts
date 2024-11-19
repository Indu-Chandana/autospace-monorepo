// Avoiding unnecessary API calls

import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay = 1000): T => {
    const [debounceValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debounceValue
}