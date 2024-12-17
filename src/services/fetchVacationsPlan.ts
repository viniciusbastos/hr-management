import { api } from './api'

const fetchVacationsPlan = async ({ queryKey }) => {
  const apiRes = api
    .get(`/vacationsplan/`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw new Error(`vacationsplan fetch not ok`)
      console.error(error)
    })

  return apiRes
}

export default fetchVacationsPlan
