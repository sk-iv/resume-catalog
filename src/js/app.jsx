import * as React from 'react';
import { hot } from 'react-hot-loader';
import './ui/StyleBase/global.css';
// import { AccountLoader } from "@features/common"

import { Routes } from './routes';

const App = hot(module)(() => (
  <>
    <Routes />
  </>
));
export default App;
