import { api } from "./api";

const fetchUser = async ({ queryKey }) => {
  const id = queryKey[1];
  const apiRes = api
    .get(`/user/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`details/${id} fetch not ok`);
      console.error(error);
    });

  return apiRes;
};

export default fetchUser;
