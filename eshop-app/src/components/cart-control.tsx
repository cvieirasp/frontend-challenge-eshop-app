import { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { CartIcon } from './icons/cart-icon'
import { useCart } from '@/hooks/useCart'

const CartCount = styled.span`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    width: 17px;
    height: 17px;
    border-radius: 100%;
    font-size: 10px;
    background-color: var(--delete-color);
    color: white;
`

const ButtonCart = styled.button`
    position: relative;
    border: none;
    background: transparent;
    cursor: pointer;
`

export function CartControl() {
    const { value } = useLocalStorage('cart-items', [])
    const { cartItems } = useCart()

    const router = useRouter()

    const handleNavigate = () => {
        router.push('/cart')
    }

    return(
        <ButtonCart onClick={handleNavigate}>
            <CartIcon />
            {cartItems.length > 0 && <CartCount>{cartItems.length}</CartCount>}
        </ButtonCart>
    )
}