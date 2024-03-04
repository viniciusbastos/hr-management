import { api } from "./api";

const fetchUser = async ({ queryKey }) => {
  const id = queryKey[1];
  const apiRes = api
    .get(`/sicknote/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(`sicknote/${id} fetch not ok`);
      console.error(error);
    });

  return apiRes;
};

export default fetchUser;
