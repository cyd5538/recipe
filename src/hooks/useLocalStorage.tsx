import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => initialValue);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const item = localStorage.getItem(key);
                setStoredValue(item ? JSON.parse(item) : initialValue);
            } catch (error) {
                console.error(error);
                setStoredValue(initialValue);
            } finally {
                setIsInitialized(true);
            }
        }
    }, [key, initialValue]);

    useEffect(() => {
        if (isInitialized) {
            try {
                localStorage.setItem(key, JSON.stringify(storedValue));
            } catch (error) {
                console.error(error);
            }
        }
    }, [key, storedValue, isInitialized]);

    return [storedValue, setStoredValue] as const;
}
