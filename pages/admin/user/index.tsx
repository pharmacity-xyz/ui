import React, { useEffect, useState } from 'react'

import AdminLayout from 'components/AdminLayout'
import { IReturnUser } from 'services/user/types'
import { getAllUsersApi } from 'services/user/userServices'

const UserManagement = () => {
  const [users, setUsers] = useState<Array<IReturnUser>>([])

  const fetchUsers = async () => {
    try {
      const res = await getAllUsersApi()
      setUsers(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <AdminLayout title="User Management">
      <div>
        <h1 className="text-2xl">User List</h1>
        <div className="container py-10 mx-auto md:px-6">
          <section className="mb-20 text-gray-800">
            <div className="block rounded-lg shadow-lg bg-white">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full mb-0">
                        <thead className="border-b rounded-t-lg text-left bg-gray-900">
                          <tr>
                            <th
                              scope="col"
                              className="text-white rounded-tl-lg text-sm font-medium px-6 py-4"
                            >
                              NAME
                            </th>
                            <th
                              scope="col"
                              className="text-white text-sm font-medium px-6 py-4"
                            >
                              EMAIL
                            </th>
                            <th
                              scope="col"
                              className="text-white text-sm font-medium px-6 py-4"
                            >
                              Country
                            </th>
                            <th
                              scope="col"
                              className="text-white text-sm font-medium px-6 py-4"
                            >
                              Company
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr className="border-b" key={user.user_id}>
                              <th
                                className="text-sm font-medium px-6 py-4 whitespace-nowrap text-left"
                                scope="row"
                              >
                                {user.first_name} {user.last_name}
                              </th>
                              <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left text-gray-500">
                                {user.email}
                              </td>
                              <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left text-gray-500">
                                {user.country}
                              </td>
                              <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left text-gray-500">
                                {user.company_name}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  )
}

export default UserManagement
