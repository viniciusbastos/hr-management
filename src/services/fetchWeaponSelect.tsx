import { api } from "./api";

const fetchWeaponSelect = async ({ queryKey }) => {
  
  const apiRes = api
    .get(`/weapons/label`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`user fetch not ok`);
      console.error(error);
    });

  return apiRes;
};

export default fetchWeaponSelect;
