import { api } from './api'

const fetchUser = async () => {
  // Your code here

  const apiRes = api
    .get(`/user`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw new Error(`user fetch not ok` + error)
      console.error(error)
    })

  return apiRes
}

export default fetchUser
