'use client'

import styled from 'styled-components'
import { DefaultPageLayout } from '@/components/default-page-layout'
import { BackButton } from '@/components/back-button'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { ProductCart } from '@/types/product'
import { formatPrice } from '@/utils/fomatters'
import { CartItem } from '@/components/cart/cart-item'
import { Divider } from '@/components/divider'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 32px;
    ${DefaultPageLayout};

    @media (min-width: ${props => props.theme.desktopBreakpoint}) {
        flex-direction: row;
    }
`

const CartListContainer = styled.div`
    width: 100%;
    
    h3 {
        margin-top: 24px;
        font-size: 24px;
        font-weight: 500;
        line-height: 150%;
        text-transform: uppercase;
        color: var(--text-dark-2);
    }

    p {
        font-size: 16px;
        font-weight: 300;
        line-height: 150%;
        color: var(--text-dark-2);

        span {
            font-weight: 600;
        }
    }
`

const CartList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    list-style: none;
    gap: 16px;
    margin-top: 24px;
`

const CartResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    min-width: 352px;
    padding: 16px 24px;
    background: white;

    h3 {
        margin-bottom: 30px;
        font-weight: 600;
        font-size: 20px;
        color: var(--text-dark-2);
        text-transform: uppercase;
    }
`

const Totaltem = styled.div<{ isBold: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 12px;
    font-weight: ${props => props.isBold ? '600' : '400'};
    font-size: 16px;
    line-height: 150%;
`

const ShopButton = styled.button`
    width: 100%;
    padding: 12px;
    margin-top: 40px;
    border-radius: 4px;
    border: none;
    color: white;
    background: var(--success-color);
    text-transform: uppercase;
    cursor: pointer;
` 

export default function Cart() {
    const { value, update } = useLocalStorage<ProductCart[]>('cart-items', [])

    const calculateTotal = (value: ProductCart[]) =>
        value.reduce((current_value, item) => current_value += (item.price_in_cents * item.quantity), 0)

    const totalPrice = calculateTotal(value);
    const formattedTotal = formatPrice(totalPrice)
    const deliveryFee = 4000;
    const formattedTotalWithDelivery = formatPrice(totalPrice + deliveryFee)

    const updateItemQuantity = (id: string, quantity: number) => {
        const newValue = value.map(item => {
            if (item.id !== id) return item
            return {...item, quantity: quantity}
        })
        update(newValue)
    }

    const deleteItem = (id: string) => {
        const filteredValues = value.filter(item => item.id !== id)
        update(filteredValues)
    }

    return (
        <Container>
            <CartListContainer>
                <BackButton navigate='/' />
                <h3>Seu carrinho</h3>
                {
                    value.length > 0 ?
                    <>
                        <p>Total ({value.length} produtos) <span> {formattedTotal}</span></p>
                        <CartList>
                            {value.map(item => 
                                <CartItem key={item.id} product={item} 
                                    handleUpdateQuantity={updateItemQuantity}
                                    handleDelete={deleteItem}
                                />
                            )}
                        </CartList>
                    </> : <p>Nenhum produto no carrinho.</p>
                }
                
            </CartListContainer>
            <CartResultContainer>
                <h3>Resumo do Pedido</h3>
                <Totaltem isBold={false}>
                    <p>Subtotal de produtos</p>
                    <p>{formattedTotal}</p>
                </Totaltem>
                <Totaltem isBold={false}>
                    <p>Entrega</p>
                    <p>{formatPrice(deliveryFee)}</p>
                </Totaltem>
                <Divider />
                <Totaltem isBold={true}>
                    <p>Total</p>
                    <p>{formattedTotalWithDelivery}</p>
                </Totaltem>
                <ShopButton>Finalizar a Compra</ShopButton>
            </CartResultContainer>
        </Container>
    )
}
