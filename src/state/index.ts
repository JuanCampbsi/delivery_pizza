import { createStore, Store } from 'redux';

import { PizzaState } from './ducks/Pizza/types';

import rootReducer from './ducks/rootReducer';

export interface ApplicationState {
  pizza: PizzaState;
}

const store: Store<ApplicationState> = createStore(rootReducer);

export { store };
