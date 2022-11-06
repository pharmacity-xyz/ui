import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-multi-carousel/lib/styles.css'

import type { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'
import { ToastContainer } from 'react-toastify'
import { AuthContextProvider } from '../context/authContextProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe="hello"
        successUrl="stripe.com"
        cancelUrl="twitter.com/dayhaysoos"
        currency="USD"
      >
        <AuthContextProvider>
          <Component {...pageProps} />
          <ToastContainer position="top-right" />
        </AuthContextProvider>
      </CartProvider>
    </>
  )
}

export default MyApp
