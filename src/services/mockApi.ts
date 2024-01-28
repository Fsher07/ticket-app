import axios from "axios";

const baseURL = "https://65b515e041db5efd28674576.mockapi.io/api";

const getCities = async () => {
  const { data } = await axios.get(`${baseURL}/cities`);
  return data;
};

const getTickets = async () => {
  const { data } = await axios.get(`${baseURL}/tickets`);
  return data;
};

export default {
  getCities,
  getTickets,
};
