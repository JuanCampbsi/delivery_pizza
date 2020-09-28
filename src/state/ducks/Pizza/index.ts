import { Reducer } from 'redux';
import { PizzaState, PizzaTypes } from './types';

const INITIAL_STATE: PizzaState = {
  crust: 1,
  size: 0,
  totalValue: 0,
  selectedToppings: [],
  isLoading: true,
};

const reducer: Reducer<PizzaState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PizzaTypes.SET_PIZZA_SIZE:
      return { ...state, ...action.payload };

    case PizzaTypes.SET_PIZZA_TOPPINGS:
      return { ...state, ...action.payload };

    case PizzaTypes.RESET_STATE:
      return INITIAL_STATE;

    case PizzaTypes.INIT_PRELOAD:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default reducer;
