import { api } from "./api";

const fetchUser = async ({ queryKey }) => {
  const month = queryKey[1];
  const apiRes = api
    .get(`/vacation/month/${month}`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(`vacation/month/${month} fetch not ok`);
      console.error(error);
    });

  return apiRes;
};

export default fetchUser;
