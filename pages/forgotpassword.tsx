import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { checkEmailExist, forgotPassword } from '../services/auth/authServices'

const ForgotPassword = () => {
  const [emailExist, setEmailExist] = useState<number | null>(null)
  const [emailAddress, setEmailAddress] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newConfirmPassword, setNewConfirmPassword] = useState('')
  const router = useRouter()

  const handleCheckEmailExist = async () => {
    try {
      const res = await checkEmailExist(emailAddress)
      if (res.data) {
        setEmailExist(1)
      } else {
        setEmailExist(0)
      }
    } catch (error) {
      toast.error('Something went wrong...')
      console.error(error)
    }
  }

  const handleUpdatePassword = async () => {
    try {
      if (newPassword !== newConfirmPassword) {
        toast.error('Password does not match')
        return
      }
      await forgotPassword(emailAddress, newPassword)
      toast.success('Successfully updated')
      router.push('/login')
    } catch (error) {
      toast.error('Something went wrong...')
      console.error(error)
    }
  }

  return (
    <section className="">
      <div className="mt-24 text-gray-800">
        <div className="flex justify-center items-center flex-wrap g-6">
          <div className="flex items-center flex-shrink-0 text-black my-6">
            <svg
              className="fill-current h-8 w-8 mr-2"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            <Link href="/">
              <span className="font-semibold text-xl tracking-tight cursor-pointer">
                MedicalEquipmentShop
              </span>
            </Link>
          </div>
        </div>
        {emailExist === 0 && (
          <div>
            <div className="flex justify-center items-center flex-wrap g-6 mb-5">
              <div className="w-1/2 border p-3 border-red-500 text-center">
                <h1 className="text-2xl text-red-500">
                  There was a problem with your request
                </h1>
                <p className="text-red-500">Your email is incorrect</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center items-center flex-wrap g-6">
          <div className="w-1/2 border p-3">
            <h1 className="text-3xl">Password assistance</h1>
            <p className="py-4">
              Enter the email address associated with your account
            </p>
            <form>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Email address"
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>

              {emailExist === 1 && (
                <>
                  <div className="mb-6">
                    <input
                      type="password"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      placeholder="Password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="password"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      placeholder="Confirm Password"
                      onChange={(e) => setNewConfirmPassword(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="text-center">
                {emailExist === null ? (
                  <button
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => handleCheckEmailExist()}
                  >
                    CONTINUE
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => handleUpdatePassword()}
                  >
                    UPDATE
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
