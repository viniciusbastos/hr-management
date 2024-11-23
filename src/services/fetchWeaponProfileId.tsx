import { api } from "./api";

const  fetchWeaponProfileId = async ({ queryKey }) => {
  const id = queryKey[1];
  const apiRes = api
    .get(`/weaponprofile/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`details/${id} fetch not ok`);
      console.error(error);
    });

  return apiRes;
};

export default fetchWeaponProfileId;
