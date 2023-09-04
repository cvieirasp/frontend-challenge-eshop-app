import { formatPrice } from '@/utils/fomatters'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import { Divider } from './divider'

interface ProductCardProps {
    id: string,
    image: string,
    title: string,
    price: number,
}

const Card = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 256px;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    border-radius: 4px 4px 0px 0px;
    overflow: hidden;
    transition: transform 0.5s ease-in;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }

    img {
        width: 256px;
        height: 300px;
    }

    h3 {
        font-weight: 300;
        font-size: 16px;
        line-height: 150%;
        color: var(--text-dark-2);
    }

    p {
        font-weight: 600;
        font-size: 14px;
        line-height: 150%;
        color: var(--shapes-dark);
    }

    div {
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: column;
        margin: 8px 0;

        > div {
            width: 228px;
            height: 1px;
            background: var(--shape-color);
        }
    }
`

export function ProductCard(props: ProductCardProps) {
    const router = useRouter()

    const handleNavigate = () => {
        router.push('/product?id=' + props.id)
    }

    return(
        <Card onClick={handleNavigate}>
            <Image src={props.image} alt={props.title} width={256} height={256} />
            <div>
                <h3>{props.title}</h3>
                <Divider />
                <p>{formatPrice(props.price)}</p>
            </div>
        </Card>
    )
}
