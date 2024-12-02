import { api } from "./api";

const fetchWeaponsInfo = async () => {
  
  const apiRes = api
    .get(`/weapons/info`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`user fetch not ok`);
      console.error(error);
    });

  return apiRes;
};

export default fetchWeaponsInfo;


