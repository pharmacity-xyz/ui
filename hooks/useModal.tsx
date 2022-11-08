import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import {
  createContext,
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react'
import Modal from 'react-modal'

type ModalContextProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const ModalContext = createContext({} as ModalContextProps)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

export const ModalProvider = ({ children }) => {
  let subtitle
  const [isOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
  }

  const cancelButtonRef = useRef(null)

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)

  return context as ModalContextProps
}
