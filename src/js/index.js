import * as React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';

const root = document.querySelector('#root');

const render = () => {
  if (root) {
    ReactDom.render(
      <Router>
        <App />
      </Router>,
      root,
    );
  }
};

// $FlowIssue
if (module.hot) {
  module.hot.accept('./app', render);
}

render();
