import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Component } from 'react';

import Root from './src/routes';
import { store } from './src/state';

console.disableYellowBox = true;

const App: FC = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);
export default App;
