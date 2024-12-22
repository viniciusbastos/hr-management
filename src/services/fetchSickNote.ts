import { api } from './api'

const fetchSickNote = async ({ queryKey }) => {
  const apiRes = api
    .get(`/sicknote`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw new Error(`sicknote/ fetch not ok`)
      console.error(error)
    })

  return apiRes
}

export default fetchSickNote
