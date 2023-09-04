export interface Product {
    id: string,
    name: string,
    description: string,
    category: string
    price_in_cents: number,
    image_url: string,
}

export interface ProductCart extends Product {
    quantity: number,
}

export interface ProductResponse {
    data: {
        Product: Product
    }
}