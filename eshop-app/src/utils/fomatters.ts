export const formatPrice = (priceInCents: number) => {
    const priceInReais = priceInCents / 100;
    return priceInReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
