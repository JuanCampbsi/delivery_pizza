import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ApplicationState } from '../state';
import { PizzaState } from '../state/ducks/Pizza/types';
import PizzaActions from '../state/ducks/Pizza/actions';

import Constants from './utils/Constants';
import SCREENS from '../screens';

const { ROUTES } = Constants;

const Stack = createStackNavigator();

const AppContainer: FC = () => {
  const dispatch = useDispatch();
  const pizzaState: PizzaState = useSelector(
    (state: ApplicationState) => state.pizza,
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(PizzaActions.initPreload());
    }, 2000);
  }, [pizzaState.isLoading]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {pizzaState.isLoading ? (
          <Stack.Screen
            name={ROUTES.PRELOAD}
            component={SCREENS.PRELOAD}
            options={{
              animationTypeForReplace: 'push',
              animationEnabled: false,
            }}
          />
        ) : (
          <>
            <Stack.Screen
              options={{
                animationTypeForReplace: 'push',
                animationEnabled: false,
              }}
              name={ROUTES.CHOOSE_SIZE}
              component={SCREENS.CHOOSE_SIZE}
            />
            <Stack.Screen
              name={ROUTES.CHOOSE_TOPPINGS}
              component={SCREENS.CHOOSE_TOPPINGS}
            />
            <Stack.Screen
              name={ROUTES.CHECK_ORDER}
              component={SCREENS.CHECK_ORDER}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
