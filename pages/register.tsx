import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { useAuth } from 'context/authContextProvider'
import { ISignUpApiData } from 'services/auth/types'

const Register: NextPage = () => {
  const [requestForm, setRequestForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    companyName: '',
  } as ISignUpApiData)
  const [error, setError] = useState({ validate: false, item: '' })
  const { user, register } = useAuth()

  const handleValidateForm = () => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (requestForm.email === '' || !requestForm.email.match(mailformat)) {
      setError({ validate: true, item: 'email' })
      return
    }
    if (requestForm.password === '') {
      setError({ validate: true, item: 'password' })
      return
    }
    if (requestForm.confirmPassword === '') {
      setError({ validate: true, item: 'confirmPassword' })
      return
    }
    if (requestForm.firstName === '') {
      setError({ validate: true, item: 'firstName' })
      return
    }
    if (requestForm.lastName === '') {
      setError({ validate: true, item: 'lastName' })
      return
    }
    if (requestForm.city === '') {
      setError({ validate: true, item: 'city' })
      return
    }
    if (requestForm.country === '') {
      setError({ validate: true, item: 'country' })
      return
    }
    if (requestForm.companyName === '') {
      setError({ validate: true, item: 'companyName' })
      return
    }

    register(requestForm)
  }

  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <Image
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
              width={500}
              height={500}
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form>
              <div className="mb-6">
                <input
                  type="email"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Email"
                  onChange={(e) =>
                    setRequestForm({ ...requestForm, email: e.target.value })
                  }
                />
                {error.validate && error.item === 'email' && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Please enter your email correctly
                  </p>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Password"
                  onChange={(e) =>
                    setRequestForm({ ...requestForm, password: e.target.value })
                  }
                />
                {error.validate && error.item === 'password' && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Please enter your password
                  </p>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Confirm Password"
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                {error.validate && error.item === 'confirmPassword' && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Please enter your confirm password
                  </p>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="First Name"
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
                      firstName: e.target.value,
                    })
                  }
                />
                {error.validate && error.item === 'firstName' && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Please enter your first name
                  </p>
                )}
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Last Name"
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
                      lastName: e.target.value,
                    })
                  }
                />
                {error.validate && error.item === 'lastName' && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Please enter your last name
                  </p>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="City"
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
                      city: e.target.value,
                    })
                  }
                />
                {error.validate && error.item === 'city' && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Please enter your city
                  </p>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Country"
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
                      country: e.target.value,
                    })
                  }
                />
                {error.validate && error.item === 'country' && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Please enter your country
                  </p>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Company Name"
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
                      companyName: e.target.value,
                    })
                  }
                />
                {error.validate && error.item === 'companyName' && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Please enter your company name
                  </p>
                )}
              </div>
              <div className="text-center lg:text-left">
                <button
                  type="button"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => handleValidateForm()}
                >
                  Register
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Do you have an account?
                  <Link href="/login">
                    <a
                      href="#!"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Login
                    </a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
