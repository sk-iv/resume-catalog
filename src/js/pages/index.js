import CardsHomePage from './home/page';
import NotFoundPage from './internal/not-found/page';
import CardEditPage from './edit/CardEditPage';

const routes = [
  {
    path: '/',
    exact: true,
    component: CardsHomePage,
  },
  {
    path: '/edit/card',
    exact: true,
    component: CardEditPage,
  },
  {
    path: '/edit/card/:userId',
    exact: true,
    component: CardEditPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

export default routes;
