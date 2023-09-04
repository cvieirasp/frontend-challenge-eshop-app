import { useState } from 'react'
import styled from 'styled-components'
import { ArrowIcon } from './icons/arrow-icon'
import { useFilter } from '@/hooks/useFilter'
import { PriorityTypes } from '@/types/filter-types'

interface FilterByPriorityProps {

}

const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: transparent;
        font-family: inherit;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: var(--text-dark);
        cursor: pointer;

        svg {
            margin-left: 16px;
        }
    }
`

const PriorityFilter = styled.ul`
    position: absolute;
    width: 176px;
    top: 100%;
    right: 8px;
    background: #FFF;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 12px 16px;
    list-style: none;
    z-index: 1;

    li {
        color: var(--text-dark);
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        cursor: pointer;
    }

    li + li {
        margin-top: 4px;
    }
`

export function FilterByPriority(props: FilterByPriorityProps) {
    const [isOpened, setIsOpened] = useState(false)
    const { priority, setPriority } = useFilter()

    const handleOpen = () => setIsOpened(prev => !prev)

    const handleUpdatePriority = (value: PriorityTypes) => {
        setPriority(value)
        setIsOpened(false)
    }
    
    return(
        <FilterContainer>
            <button onClick={handleOpen}>
                Organizar por
                <ArrowIcon />
            </button>
            {isOpened &&
            <PriorityFilter>
                <li onClick={() => handleUpdatePriority(PriorityTypes.NEWS)}>Novidades</li>
                <li onClick={() => handleUpdatePriority(PriorityTypes.HIGHEST_PRICE)}>Preço: Maior - menor</li>
                <li onClick={() => handleUpdatePriority(PriorityTypes.LOWEST_PRICE)}>Preço: Menor - maior</li>
                <li onClick={() => handleUpdatePriority(PriorityTypes.POPULARITY)}>Mais vendidos</li>
            </PriorityFilter>
            }
        </FilterContainer>
    )
}
