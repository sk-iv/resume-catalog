import request from '../features/common';
import db from '../../db/db.json'

/**
 * Get info about user or users
 */
const getItem = (id) => {
  return new Promise((res) => {
    setTimeout(res(db.users[id]), 1000)
  })
}

const getList = () => {
  return new Promise((res) => {
    setTimeout(res(db), 1000)
  })
}

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
