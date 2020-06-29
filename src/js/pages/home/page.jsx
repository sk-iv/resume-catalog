import * as React from 'react';
import Catalog from '../../features/catalog';
import Carousel from '../../ui/Carousel';
import Grid, { GridTile } from '../../ui/Grid';

const pages = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://panteric.ru/files/gallery/3856/medium/qfbz5bqhuqq_1581614908.jpg',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
];

const CardsHomePage = () => (
  <Grid>
    <GridTile size={12}>
      <Catalog />
    </GridTile>
    <GridTile size={12}>
      <Carousel pages={pages} />
    </GridTile>
  </Grid>
);
export default CardsHomePage;
