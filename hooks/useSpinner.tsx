import { createContext, useState } from 'react'

type SpinnerContextProps = {
  loading: boolean
}

const SpinnerContext = createContext({} as SpinnerContextProps)

export const SpinnerProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)

  
}
