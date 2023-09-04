import { useQuery } from '@tanstack/react-query'
import axios, { AxiosPromise } from 'axios'
import { ProductResponse } from '@/types/product'

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

const fetcher = (id: string): AxiosPromise<ProductResponse> => {
    return axios.post(API_URL, { query: `
        query {
            Product(id: "${id}") {
                id
                name
                description
                category
                price_in_cents
                image_url
            }
        }
    `})
}

export function useProduct(id: string) {
    const { data } = useQuery({
        queryFn: () => fetcher(id),
        queryKey: ['product', id],
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutos
    })

    return {
        data: data?.data?.data?.Product
    }
}
