import styled from 'styled-components'
import { BackIcon } from './icons/back-icon'
import { useRouter } from 'next/navigation'

interface BackButtonProps {
    navigate: string
}

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: none;
    background: transparent;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: var(--text-secondary);
    cursor: pointer;
`

export function BackButton({ navigate }: BackButtonProps) {
    const router = useRouter()

    const handleNavigate = () => {
        router.push(navigate)
    }

    return (
        <Button onClick={handleNavigate}><BackIcon /> Voltar</Button>
    )
}
