import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(timeoutID);
    }, [value, delay]);

    return debouncedValue;
}
