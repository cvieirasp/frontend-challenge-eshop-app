import { useDeferredValue } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosPromise } from 'axios'
import { ProductsResponse } from '@/types/products-response'
import { useFilter } from './useFilter'
import { CagegoryTypes, PriorityTypes } from '@/types/filter-types'
import { getFilter, getOrder } from '@/utils/graphql-params'

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

const fetcher = (query: string): AxiosPromise<ProductsResponse> => {
    return axios.post(API_URL, { query })
}

const mountQuery = (type: CagegoryTypes, priority: PriorityTypes, page: number, perPage: number) => {
    var { field, order } = getOrder(priority);

    if (type === CagegoryTypes.ALL) return `
        query {
            allProducts(sortField: "${field}", sortOrder: "${order}", page: ${page}, perPage: ${perPage}) {
                id
                name
                price_in_cents
                image_url
            },
            _allProductsMeta {
              count
            }
        }
    `
    return `
        query {
            allProducts(filter: { category: "${getFilter(type)}" }, sortField: "${field}", sortOrder: "${order}", page: ${page}, perPage: ${perPage}) {
                id
                name
                price_in_cents
                image_url
            },
            _allProductsMeta(filter: { category: "${getFilter(type)}" }) {
                count
            }
        }
    `
}

export function useProducts() {
    const { page, type, priority, search } = useFilter()
    const searchValue = useDeferredValue(search)
    const itemsPerPage =  12;
    const { data } = useQuery({
        queryFn: () => fetcher(mountQuery(type, priority, page, itemsPerPage)),
        queryKey: ['products', page, type, priority],
        staleTime: 1000 * 60 * 1, // 1 minuto
    })

    const products = data?.data?.data?.allProducts
    const total = data?.data?.data?._allProductsMeta.count
    const filteresProducts = products?.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()))

    return {
        data: filteresProducts,
        total: total
    }
}
