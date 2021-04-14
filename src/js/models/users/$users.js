import {
  createStore, createEffect, sample, createEvent, combine,
} from 'effector';
import { normalize } from 'normalizr';
import stringSimilarity from 'string-similarity';

import usersApi from '../../api/users';
import usersSchema from './users.schema';
import timeDiff from '../../lib/timeDiff';


const parseComputeSize = (arr, name) => {
  if (arr.length) {
    const min = arr[0].from;
    const max = arr[arr.length - 1].to === 'NOW_DATE' ? Math.floor((new Date()).getTime() / 1000) : arr[arr.length - 1].to;

    const diff = max - min;
    return arr.map((j) => {
      const shiftFrom = j.from - min;
      const to = j.to === 'NOW_DATE' ? max : j.to;
      const timeRange = timeDiff(new Date(j.from * 1000), new Date(to * 1000));

      return {
        ...j,
        width: (to - min - shiftFrom) / diff,
        offset: (shiftFrom) / diff,
        experienceTimeinterval: `${timeRange.years} г ${timeRange.months} мес.`,
        accent: stringSimilarity.compareTwoStrings(j.subtitle || '', name) > 0.6,
      };
    });
  }
  return null;
};

const dbComputed = (data) => data.result.map((id) => ({
  ...data.entities.users[id],
  units: data.entities.users[id].timeline
    ? parseComputeSize(data.entities.users[id].timeline, data.entities.users[id].position)
    : [],
}));

// const snapshotToArray = (snapshot) => Object.entries(snapshot)
//   .map((e) => ({ ...e[1], key: e[0] }));
// Определения

export const componentMounted = createEvent('component mounted');
export const componentUnmounted = createEvent('component unmounted');

const getUsersFx = createEffect('get user');

const loading = createStore(false);
const error = createStore(null);
const data = createStore(null);

const $users = combine({ loading, data, error });

// Логика и связи

getUsersFx.use((props) => usersApi.getList(props));

loading.on(getUsersFx.pending, (state, pending) => pending);

error.on(getUsersFx.fail, (state, { error: err }) => err);

data.on(getUsersFx.done, (state, { result }) => {
  const users = normalize(result.users, usersSchema)
  return dbComputed(users)
});

sample({
  source: componentMounted, /* 1 */
  fn: (props) => (props), /* 2 */
  target: getUsersFx, /* 3 */
});

export default $users;
