import { createStore, createEffect, createStoreObject } from 'effector';
import usersApi from '../../api/users';

const snapshotToArray = (snapshot) => Object.entries(snapshot)
  .map((e) => ({ ...e[1], key: e[0] }));


export const getUsers = createEffect('get user')
  .use(() => usersApi.getList());

const loading = createStore(false)
  .on(getUsers.pending, (state, pending) => pending);

const error = createStore(null)
  .on(getUsers.fail, (state, { error: err }) => err);

const data = createStore(null)
  .on(getUsers.done, (state, { result }) => snapshotToArray(result));


const $users = createStoreObject({ loading, data, error });


export default $users;
