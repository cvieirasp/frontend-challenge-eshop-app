import { useEffect, useState } from 'react'
import { useCart } from './useCart';
import { ProductCart } from '@/types/product';

export function useLocalStorage<T>(item: string, initialValue: T) {
    const [value, setValue] = useState(initialValue)
    const { addToCart } = useCart()

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const value = localStorage.getItem(item)
        if (value) {
            const objItem = JSON.parse(value)
            setValue(objItem)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const update = (newValue: T) => {
        setValue(() => newValue);
        addToCart(newValue as ProductCart[])
        localStorage.setItem(item, JSON.stringify(newValue))
    }

    return {
        value,
        update,
    }
}
