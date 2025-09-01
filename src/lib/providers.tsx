"use client"
import CartContextProvider from '@/context/cartContext';
import WishlistContextProvider from '@/context/wishlistContext';
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'


function Providers({children}:{children:ReactNode}) {

    return (
      <SessionProvider>
        <WishlistContextProvider>
          <CartContextProvider>{children}</CartContextProvider>
        </WishlistContextProvider>
      </SessionProvider>
    );
}

export default Providers
