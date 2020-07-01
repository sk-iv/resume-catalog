import React from 'react';
import PropTypes from 'prop-types';
import { useStore } from 'effector-react';
import { $users, componentUnmounted, componentMounted } from '../../models';

export const CatalogContext = React.createContext();

export const CatalogProvider = ({ children }) => {
  React.useEffect(() => {
    componentMounted(undefined);
    return () => componentUnmounted;
  }, []);

  const { loading, error, data } = useStore($users);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>Данные не загрузились</p>;

  return (
    <CatalogContext.Provider value={data}>
      { children }
    </CatalogContext.Provider>
  );
};

CatalogProvider.propTypes = {
  children: PropTypes.node,
};
