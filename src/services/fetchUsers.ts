import { api } from './api'

export const fetchUser = async (id: string) => {
  console.log('Fetching user with ID:', id)
  const response = await api.get(`/user/${id}`)
  return response.data
}

export const fetchUsers = async () => {
  try {
    const response = await api.get('/user')
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('user fetch not ok' + error)
  }
}
export const fetchUserSelected = async ({ queryKey }) => {
  const id = queryKey[1]
  const apiRes = api
    .get(`/vacation/users/1`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw new Error(`user fetch not ok`)
      console.error(error)
    })

  return apiRes
}
