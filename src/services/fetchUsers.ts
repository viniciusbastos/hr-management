import { api } from "./api";
import { token } from "./token";

<<<<<<< HEAD
const fetchUser = async ({ queryKey }) => {
=======
const fetchUser = async ({ queryKey }: { queryKey: [string, number] }) => {
  // Your code here
>>>>>>> 94c74ac (new macbook test)
  const id = queryKey[1];
  const apiRes = api
    .get(`/user`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`user fetch not ok`+ error);
      console.error(error);
    });

  return apiRes;
};

export default fetchUser;
