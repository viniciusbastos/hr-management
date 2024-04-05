import { api } from "./api";

const fetchHealthProfessional = async ({ queryKey }) => {
  const id = queryKey[1];
  const apiRes = api
    .get(`/healthprofessional`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(`details/${id} fetch not ok`);
      console.error(error);
    });

  return apiRes;
};

export default fetchHealthProfessional;
