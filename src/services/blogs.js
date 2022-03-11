import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

let config;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  config = {
    headers: { Authorization: token },
  };
  // console.log({newObject: new})
  const response = await axios.post(baseUrl, newObject, config);
  console.log(response.data);
  return response.data;
};


const update = async (id, newObject) => {
  console.log(id);
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const remove = async(id) => {
  console.log(id);
  config={
    headers:{ Authorization:token }
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
// const update = (id, newObject) => {
//   const request = axios.put(`${ baseUrl }/${id}`, newObject)
//   return request.then(response => response.data)
// }





// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update, remove };
