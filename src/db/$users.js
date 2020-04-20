import { createStore, createEffect, createStoreObject } from 'effector';

const snapshotToArray = (snapshot) => Object.entries(snapshot)
  .map((e) => ({ ...e[1], key: e[0] }));


export const getUsers = createEffect('get user')
  .use(() => fetch('https://resume-catalog.firebaseio.com/users.json')
    .then((res) => res.json()));

const loading = createStore(false)
  .on(getUsers.pending, (state, pending) => pending);

const error = createStore(null)
  .on(getUsers.fail, (state, { error: err }) => err);

const data = createStore(null)
  .on(getUsers.done, (state, { result }) => snapshotToArray(result));


const $users = createStoreObject({ loading, data, error });


export default $users;
