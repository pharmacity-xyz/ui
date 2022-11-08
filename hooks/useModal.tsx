import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import OrderDetailModal from '../components/Modal/OrderModalDetail'
import { IOrderDetail } from '../services/order/types'

type ModalContextProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setOrderDetail: Dispatch<SetStateAction<IOrderDetail>>
}

const ModalContext = createContext({} as ModalContextProps)

export const ModalProvider = ({ children }) => {
  let subtitle
  const [isOpen, setIsOpen] = useState(false)
  const [orderDetail, setOrderDetail] = useState({} as IOrderDetail)

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, setOrderDetail }}>
      {isOpen && (
        <OrderDetailModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          orderDetail={orderDetail}
        />
      )}
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)

  return context as ModalContextProps
}
