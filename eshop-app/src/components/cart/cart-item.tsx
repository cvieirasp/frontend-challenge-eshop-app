import styled from 'styled-components'
import Image from 'next/image'
import { ProductCart } from '@/types/product'
import { formatPrice } from '@/utils/fomatters'
import { DeleteIcon } from '../icons/delete-icon'

interface CartItemProps {
    product: ProductCart
    handleUpdateQuantity(id: string, quantity: number): void
    handleDelete(id: string): void
}

const ItemContainer = styled.li`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 210px;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    background: white;

    button {
        position: absolute;
        top: 16px;
        right: 20px;
        border: none;
        background: transparent;
        cursor: pointer;
    }

    img {
        width: 256px;
        object-fit: cover;
    }

    > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        width: 100%;
        height: 100%;
        padding: 16px 24px;

        h4 {
            max-width: 90%;
            font-weight: 300;
            font-size: 20px;
            line-height: 150%;
            color: var(--text-dark-2);
        }

        p {
            max-height: 50%;
            font-weight: 400;
            font-size: 12px;
            line-height: 150%;
            color: var(--text-dark-2);
            overflow: hidden;
            text-overflow: ellipsis;
        }

        div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            span {
                font-weight: 600;
                font-size: 16px;
                color: var(--shapes-dark)
            }
        }
    }
`

const SelectQuantity = styled.select`
    padding: 8px;
    border: 1.5px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--bg-secondary);
    font-weight: 400;
    font-size: 16px;
    color: var(--text-dark);
`

export function CartItem({ product, handleUpdateQuantity, handleDelete }: CartItemProps) {
    return(
        <ItemContainer>
            <Image src={product.image_url} alt={product.name} width={256} height={256} />
            <div>
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <div>
                    <SelectQuantity value={product.quantity} onChange={(event) => handleUpdateQuantity(product.id, parseInt(event.target.value))}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </SelectQuantity>
                    <span>{formatPrice(product.price_in_cents)}</span>
                </div>
            </div>
            <button onClick={() => handleDelete(product.id)} aria-label='Remover'><DeleteIcon /></button>
        </ItemContainer>
    )
}
