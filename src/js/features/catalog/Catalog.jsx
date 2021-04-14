import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import CatalogList from './CatalogList';
import { CatalogProvider } from './CatalogContext';
import Grid, { GridTile } from '../../ui/Grid';


const Catalog = () => {
  const handlerClick = (e) => {
    // TODO: create card
  };

  return (
    <CatalogProvider>
      <Grid>
        <GridTile size={12}>
          <CatalogList />
        </GridTile>
      </Grid>

    </CatalogProvider>
  );
};
export default Catalog;
