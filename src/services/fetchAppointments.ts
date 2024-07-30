import { api } from "./api";

const fechAppointments = async ({ queryKey }) => {
  const id = queryKey[1];
  const apiRes = api
    .get(`/appointments`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`details/${id} fetch not ok`);
      console.error(error);
    });

  return apiRes;
};

export default fechAppointments;
