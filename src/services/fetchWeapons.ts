import { api } from './api'

export const fetchWeapons = async ({ queryKey }) => {
  const id = queryKey[1]
  const apiRes = api
    .get(`/weapons/fixed`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw new Error(`weapons/ fetch not ok` + error)
      console.error(error)
    })

  return apiRes
}

export const fetchWeaponById = async (id: string) => {
  console.log('Fetching weapon with ID:', id)
  const response = await api.get(`/showweaponsbyid/${id}`)
  return response.data
}
