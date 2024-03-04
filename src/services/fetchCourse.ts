import { api } from "./api";

const fetchCourse = async ({ queryKey }) => {
  const name = queryKey[1];
  const apiRes = api
    .get(`/courses/tipo/${name}`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(`courses/tipo/${name} fetch not ok`);
      console.error(error);
    });

  return apiRes;
};

export default fetchCourse;
