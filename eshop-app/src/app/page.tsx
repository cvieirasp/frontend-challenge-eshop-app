'use client'

import styled from 'styled-components'
import { FilterBar } from '@/components/filter-bar'
import { ProductsList } from '@/components/products-list'
import { DefaultPageLayout } from '@/components/default-page-layout'

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${DefaultPageLayout};
`

export default function Home() {
  return (
    <PageWrapper>
      <FilterBar />
      <ProductsList />
    </PageWrapper>
  )
}
