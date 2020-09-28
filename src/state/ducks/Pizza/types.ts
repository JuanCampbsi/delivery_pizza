import { ImageSourcePropType } from 'react-native';

export interface ToppingInterface {
  name: string;
  image: ImageSourcePropType;
}

export enum PizzaTypes {
  SET_PIZZA_SIZE = 'SET_PIZZA_SIZE',
  SET_PIZZA_TOPPINGS = 'SET_PIZZA_TOPPINGS',
  RESET_STATE = 'RESET_STATE',
  INIT_PRELOAD = 'INIT_PRELOAD',
}

export interface PizzaState {
  size: number;
  crust: number;
  totalValue: number;
  selectedToppings: [] | ToppingInterface[];
  isLoading: boolean;
}
