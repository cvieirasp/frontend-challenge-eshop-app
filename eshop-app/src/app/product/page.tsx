'use client'

import styled from 'styled-components'
import Image from 'next/image'
import { DefaultPageLayout } from '@/components/default-page-layout'
import { BackButton } from '@/components/back-button'
import { useProduct } from '@/hooks/useProduct'
import { formatPrice } from '@/utils/fomatters'
import { ShopBagIcon } from '@/components/icons/shop-bag-icon'
import { useCart } from '@/hooks/useCart'

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    ${DefaultPageLayout};

    section {
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 32px;
        margin-top: 24px;

        img {
            max-width: 640px;
            width: 50%;
            height: auto;
        }

        > div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 12px;

            button {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                background: #115D8C;
                border-radius: 4px;
                border: none;
                mix-blend-mode: multiply;
                padding: 10px 0;
                text-align: center;
                font-weight: 500;
                font-size: 16px;
                text-transform: uppercase;
                color: white;
                cursor: pointer;
            }
        }
    }
`

const ProductInfo = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    span {
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        color: var(--text-dark-2);
    }

    h2 {
        margin-top: 12px;
        font-weight: 300;
        font-size: 32px;
        line-height: 150%;
        color: var(--text-dark-2);
    }

    /* Segundo SPAN */
    span:nth-of-type(2) {
        margin-bottom: 24px;
        font-weight: 600;
        font-size: 20px;
        color: var(--shapes-dark);
    }

    p {
        font-weight: 400;
        font-size: 12px;
        color: var(--text-dark);
    }

    div {
        margin-top: 24px;

        h3 {
            text-transform: uppercase;
            font-weight: 500;
            font-size: 16px;
            color: var(--text-dark);
        }

        p {
            font-weight: 400;
            font-size: 14px;
            color: var(--text-dark);
        }
    }
`

export default function Product({ searchParams }: { searchParams: { id: string } }) {
    const { data } = useProduct(searchParams.id)
    const { addToCart } = useCart()

    const handleAddCartItem = () => {
        let actualCartItems;
        const cartItems = localStorage.getItem('cart-items');
        if (cartItems) {
            actualCartItems = JSON.parse(cartItems);
            const productIndex = actualCartItems.findIndex((item: { id: string }) => item.id === searchParams.id)
            if (productIndex >= 0) {
                actualCartItems[productIndex].quantity += 1;
            } else {
                actualCartItems.push({ ...data, quantity: 1 })
            }
        } else {
            actualCartItems = [{ ...data, quantity: 1 }]
        }
        localStorage.setItem('cart-items', JSON.stringify(actualCartItems))
        addToCart(actualCartItems)
    }

    return (
        <Container>
            <BackButton navigate='/' />
            <section>
            {
                data && <>
                <Image src={data.image_url} alt={data.name} width={256} height={256} />
                <div>
                    <ProductInfo>
                        <span>{data.category}</span>
                        <h2>{data.name}</h2>
                        <span>{formatPrice(data.price_in_cents)}</span>
                        <p>*Frete de R$40,00 para todo o Brasil. Grátos para compras acima de R$900,00.</p>
                        <div>
                            <h3>Descrição</h3>
                            <p>{data.description}</p>
                        </div>
                    </ProductInfo>
                    <button onClick={handleAddCartItem}><ShopBagIcon /> Adicionar ao carrinho</button>
                </div>
                </>
            }
            </section>
        </Container>
    )
}
