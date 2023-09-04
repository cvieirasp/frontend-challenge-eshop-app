'use client'

import styled from 'styled-components'
import { FilterByTypes } from './filter-by-type'
import { FilterByPriority } from './filter-by-priority'

interface FilterBarProps {

}

const FilterContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: start;
    justify-content: space-between;
    gap: 24px;
`

export function FilterBar(props: FilterBarProps) {
    return(
        <FilterContainer>
            <FilterByTypes />
            <FilterByPriority />
        </FilterContainer>
    )
}
