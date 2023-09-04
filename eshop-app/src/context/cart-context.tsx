import { ProductCart } from '@/types/product';
import React, { ReactNode, useState, createContext } from 'react'

interface ProviderProps {
    children: ReactNode
}

// Criando o contexto do carrinho
export const CartContext = createContext({
    cartItems: [] as ProductCart[],
    addToCart: (item: ProductCart[]) => {},
});

// Componente provedor do contexto
export function CartProvider({ children }: ProviderProps) {
  const [cartItems, setCartItems] = useState<ProductCart[]>([]);

  // Função para adicionar um item ao carrinho
  const addToCart = (item: ProductCart[]) => {
    setCartItems(item);
  };

  // Valor do contexto
  const contextValue = {
    cartItems,
    addToCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}
