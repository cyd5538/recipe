"use client";

import { useState, useEffect } from "react";

export function useLocalStorageArray<T extends { id: string }>(key: string, maxItems: number = 5) {
    const [storedValue, setStoredValue] = useState<T[]>(() => {
      if (typeof window !== "undefined") {
        try {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : [];
            } catch (error) {
              console.error(error);
              return [];
            }
          }
          return [];
      });

    useEffect(() => {
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(key, JSON.stringify(storedValue));
          } catch (error) {
            console.error(error);
          }
        }
    }, [key, storedValue]);

    // 새로운 데이터를 추가하는 함수 (큐 구조)
    const addItem = (newItem: T) => {
      setStoredValue((prev) => {
          const filtered = prev.filter((item) => item.id !== newItem.id);
          return [newItem, ...filtered].slice(0, maxItems);
      });
    };

    return [storedValue, addItem] as const;
}
