'use client'

import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import { Saira_Stencil_One } from 'next/font/google'
import { PrimaryInputWithSearchIcon } from './primary-input'
import { CartControl } from './cart-control'
import { useFilter } from '@/hooks/useFilter'

const sairaStencil = Saira_Stencil_One({
    weight: ['400'],
    subsets: ['latin'],
})

interface HeaderProps {

}

const TagHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    gap: 24px;

    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 24px;
    }

    @media (min-width: ${props => props.theme.desktopBreakpoint}) {
        padding: 20px 160px;
    }
`

const Logo = styled.a`
    color: var(--logo-color);
    font-weight: 400;
    font-size: 24px;
    line-height: 150%;
    text-decoration: none;
    cursor: pointer;

    @media (min-width: ${props => props.theme.desktopBreakpoint}) {
        font-size: 40px;
    }
`

export function Header(props: HeaderProps) {
    const { search, setSearch } = useFilter()

    const router = useRouter()

    const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        router.push('/')
    }

    return (
        <TagHeader>
            <Logo className={sairaStencil.className} onClick={(event) => handleNavigate(event)}>E-Shop</Logo>
            <div>
                <PrimaryInputWithSearchIcon onChange={(event) => setSearch(event.target.value)} placeholder='Procurando por algo específico?' />
                <CartControl />
            </div>
        </TagHeader>
    )
}
