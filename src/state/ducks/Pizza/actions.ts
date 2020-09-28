import { PizzaTypes, ToppingInterface } from './types';

interface PizzaSizeInterface {
  crust: number | null;
  size: number;
  totalValue: number;
}

interface SetPizzaSizeReturn {
  type: string;
  payload?: PizzaSizeInterface;
}

interface PizzaToppingsInterface {
  totalValue: number;
  selectedToppings: [] | ToppingInterface[];
}

interface SetPizzaToppingsReturn {
  type: string;
  payload: PizzaToppingsInterface;
}

const setPizzaSize = (payload: PizzaSizeInterface): SetPizzaSizeReturn => ({
  type: PizzaTypes.SET_PIZZA_SIZE,
  payload,
});

const setPizzaToppings = (
  payload: PizzaToppingsInterface,
): SetPizzaToppingsReturn => ({
  type: PizzaTypes.SET_PIZZA_TOPPINGS,
  payload,
});

const resetPizzaState = (): SetPizzaSizeReturn => ({
  type: PizzaTypes.RESET_STATE,
});

const initPreload = (): SetPizzaSizeReturn => ({
  type: PizzaTypes.INIT_PRELOAD,
});

const PizzaActions = {
  setPizzaSize,
  setPizzaToppings,
  resetPizzaState,
  initPreload,
};

export default PizzaActions;
