import React from 'react';
import { useStore } from 'effector-react';
import stringSimilarity from 'string-similarity';
import { $users, getUsers } from '../../models';
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


export const CatalogContext = React.createContext();
export const CatalogProvider = ({ children }) => {
  React.useEffect(() => {
    getUsers();
  }, []);

  const { loading, error, data } = useStore($users);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>Данные не загрузились</p>;

  const dbComputed = data.map((user) => ({ ...user, units: user.timeline ? parseComputeSize(user.timeline, user.position) : [] }));

  return (
    <CatalogContext.Provider value={dbComputed}>
      {children}
    </CatalogContext.Provider>
  );
};
