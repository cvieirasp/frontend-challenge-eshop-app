import { Product } from "./product"

export interface ProductsResponse {
    data: {
        allProducts: Product[],
        _allProductsMeta: {
            count: number
        }
    }
}
