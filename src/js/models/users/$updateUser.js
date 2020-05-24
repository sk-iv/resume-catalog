import { createEffect } from 'effector';
// import usersApi from '../../api/users';

const updateUser = createEffect('update user')
  .use(({ id, ...payload }) => {
    if (id) {
      return console.log({ [id]: { ...payload } });
      // return usersApi.updateItem({ [id]: { ...payload } });
    }
    return null;
  });

export default updateUser;
