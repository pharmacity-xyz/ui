import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-multi-carousel/lib/styles.css'

import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { AuthContextProvider } from '../context/authContextProvider'
import { ModalProvider } from '../hooks/useModal'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
        <ToastContainer position="top-right" />
      </AuthContextProvider>
    </>
  )
}

export default MyApp
