'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useProducts } from '@/hooks/useProducts'
import { useFilter } from '@/hooks/useFilter'
import { ProductCard } from './product-card'
import { ChevronIconLeft, ChevronIconRight } from './icons/chevron-icon'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    width: 100%;
    margin-top: 32px;
`

const ListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 256px);
    grid-gap: 32px;
    max-width: 100%;
`

const PageControl = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    width: 100%;
`

const PageButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
`

const ButtonPage = styled.button<{ selected: boolean }>`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        border: ${props => props.selected ? 'solid 2px var(--selected-color)' : 'none'};
        background: ${props => props.selected ? 'transparent' : 'var(--shape-color)'};
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0em;
        color: ${props => props.selected ? 'var(--selected-color)' : 'var(--text-dark-2)'};
        cursor: pointer;

        svg {
            width: 18px;
            height: 18px;
        }
`

export function ProductsList() {
    const { data, total } = useProducts()
    const { page, setPage } = useFilter()
    const [totalPages, setTotalPages] = useState(0)
    
    useEffect(() => {
        if (total && total > 0) {
            const calcTotalPages = Math.ceil(total/12);
            setTotalPages(calcTotalPages)
        }
    }, [total])

    const renderButtons = () => {
        if (totalPages === 0) return

        let container = [];
        for (let i = 0; i < totalPages; i++) {
            container.push(<ButtonPage key={i} selected={page === i} onClick={() => handlePage(i)}>{i+1}</ButtonPage>)
        }
        
        if (page > totalPages-1) {
            handlePage(0)
        }

        return container
    };

    const handlePreviousPage = () => {
        if (page === 0) return
        setPage(page-1)
    }

    const handleNextPage = () => {
        if (page === totalPages-1) return
        setPage(page+1)
    }

    const handlePage = (pageNumber: number) => {
        setPage(pageNumber)
    }

    return(
        <Container>
        <PageControl>
            <PageButtons>
                {renderButtons()}
            </PageButtons>
            <PageButtons>
                <ButtonPage selected={false} onClick={handlePreviousPage}><ChevronIconLeft /></ButtonPage>
                <ButtonPage selected={false} onClick={handleNextPage}><ChevronIconRight /></ButtonPage>
            </PageButtons>
        </PageControl>
        <ListContainer>
            {
                data?.map(product => <ProductCard 
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    price={product.price_in_cents}
                    image={product.image_url}
                />)
            }
        </ListContainer>
        </Container>
    )
}
