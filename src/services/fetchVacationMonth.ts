import { api } from "./api";

const fetchUser = async ({ queryKey }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authorization")}`,
    },
  };
  const month = queryKey[1];
  const apiRes = api
    .get(`/vacation/month/${month}`, config)
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
