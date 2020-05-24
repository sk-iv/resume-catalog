import { createStore, createEffect, createStoreObject } from 'effector';
import { normalize, schema } from 'normalizr';
import usersApi from '../../api/users';
// https://github.com/paularmstrong/normalizr/blob/HEAD/docs/api.md#objectdefinition

const userSchema = new schema.Entity('user', {}, {
  processStrategy: (obj) => ({
    ...obj,
    localeDateOfBirth: new Date(obj.dateOfBirth * 1000).toLocaleDateString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit' }),
  }),
});

export const getUser = createEffect('get user')
  .use(({ id }) => {
    if (id) {
      return usersApi.getItem(id)
        .then((data) => {
          const j = normalize(data, userSchema);
          return j.entities.user[j.result];
        });
    }
    return null;
  });

const loading = createStore(false)
  .on(getUser.pending, (state, pending) => pending);

const error = createStore(null)
  .on(getUser.fail, (state, { error: err }) => err);

const data = createStore(null)
  .on(getUser.done, (state, { result }) => result);

const $users = createStoreObject({ loading, data, error });


export default $users;
