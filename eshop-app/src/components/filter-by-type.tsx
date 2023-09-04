import styled from 'styled-components'
import { useFilter } from '@/hooks/useFilter'
import { CagegoryTypes } from '@/types/filter-types'

interface FilterItemProps {
    selected?: boolean
}

const FilterList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    list-style: none;

    @media (min-width: ${props => props.theme.desktopBreakpoint}) {
        gap: 40px;
    }
`

const FilterItem = styled.li<FilterItemProps>`
    border-bottom: ${props => props.selected ? '4px solid var(--orange-low)' : ''};
    font-family: inherit;
    font-weight: ${props => props.selected ? 600 : 400};
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    text-transform: uppercase;
    color: var(--text-dark);
    cursor: pointer;

    @media (min-width: ${props => props.theme.desktopBreakpoint}) {
        font-size: 16px;
        line-height: 22px;
    }
`

export function FilterByTypes() {
    const { type, setType } = useFilter()

    const handleChangeType = (value: CagegoryTypes) => {
        setType(value)
    }

    return(
        <FilterList>
            <FilterItem selected={type === CagegoryTypes.ALL} onClick={() => handleChangeType(CagegoryTypes.ALL)}>Todos os Produtos</FilterItem>
            <FilterItem selected={type === CagegoryTypes.BOOKS} onClick={() => handleChangeType(CagegoryTypes.BOOKS)}>Livros</FilterItem>
            <FilterItem selected={type === CagegoryTypes.GAMES} onClick={() => handleChangeType(CagegoryTypes.GAMES)}>Jogos</FilterItem>
        </FilterList>
    )
}
