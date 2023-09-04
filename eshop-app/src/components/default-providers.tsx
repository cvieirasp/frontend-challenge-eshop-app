'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { FilterContextProvider } from '@/context/filter-context'
import { CartProvider } from '@/context/cart-context'

interface DefaultProviderProps {
    children: ReactNode
}

const theme = {
    desktopBreakpoint: '768px'
}

export function DefaultProvider({ children }: DefaultProviderProps) {
    const client = new QueryClient()
    return (
        <QueryClientProvider client={client}>
            <FilterContextProvider>
                <CartProvider>
                    <ThemeProvider theme={theme}>
                        {children}
                    </ThemeProvider>
                </CartProvider>
            </FilterContextProvider>
        </QueryClientProvider>
    )
}
