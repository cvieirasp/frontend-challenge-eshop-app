'use client'

import { createContext, ReactNode, useState } from 'react'
import { CagegoryTypes, PriorityTypes } from '@/types/filter-types'

interface ProviderProps {
    children: ReactNode
}

export const FilterContext = createContext({
    search: '',
    page: 0,
    type: CagegoryTypes.ALL,
    priority: PriorityTypes.POPULARITY,
    setSearch: (value: string) => {},
    setPage: (value: number) => {},
    setType: (value: CagegoryTypes) => {},
    setPriority: (value: PriorityTypes) => {},
})

export function FilterContextProvider({ children }: ProviderProps) {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(0)
    const [type, setType] = useState(CagegoryTypes.ALL)
    const [priority, setPriority] = useState(PriorityTypes.POPULARITY)

    return(
        <FilterContext.Provider value={{ search, page, type, priority, setSearch, setPage, setType, setPriority }}>
            {children}
        </FilterContext.Provider>
    )
}
