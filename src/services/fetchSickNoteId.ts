import { api } from "./api";

const fetchCourseId = async ({ queryKey }) => {
  const id = queryKey[1];
  const apiRes = api
    .get(`/sicknote/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`sicknote/${id} fetch not ok`);
      console.error(error);
    });

  return apiRes;
};

export default fetchCourseId;
