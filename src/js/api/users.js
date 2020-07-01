import request from '../features/common';

/**
 * Get info about user or users
 */
const getItem = (id) => request('GET', `/users/${id}.json`);

const getList = () => request('GET', '/users.json');

/**
 * update user
 */
const updateItem = (body) => request('PUT', '/users.json', { options: { body } });

const usersApi = {
  getItem,
  getList,
  updateItem,
};
export default usersApi;
