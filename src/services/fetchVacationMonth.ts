import { api } from "./api";

const fetchUser = async ({ queryKey }) => {
  const month = queryKey[1];
  const apiRes = api
    .get(`/vacations/month/${month}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`vacation/month/${month} fetch not ok`);
      console.error(error);
    });

  return apiRes;
};

export default fetchUser;
