import React, { FC, useState, useEffect } from 'react';
import { Alert, ImageSourcePropType } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import { ApplicationState } from '../../state';
import PizzaActions from '../../state/ducks/Pizza/actions';
import { PizzaState } from '../../state/ducks/Pizza/types';
import { isSmallDevice, deviceWidth, deviceHeight } from '../../utils/Layout';
import normalize from '../../utils/normalize';
import pizzaImg from '../../resources/images/pizza.png';
import arrowLeft from '../../resources/images/left-arrow.png';
import Constants from '../../routes/utils/Constants';

import * as IMAGES from '../../resources/images';

const { ROUTES } = Constants;

const Container = styled.View({
  flex: 1,
  backgroundColor: '#F5DEB3',
});

const HeaderBackButton = styled.TouchableOpacity({
  width: 50,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
});
const HeaderBackImage = styled.Image({
  width: 25,
  height: 25,
});

const HeaderTitleWrapper = styled.Text({
  alignItems:'center'
});

const HeaderTitleText = styled.Text({
  fontSize: normalize(24),
  textAlign: 'center',
  color: '#7e512a',
});

const PizzaWrapper = styled.View({
  width: '100%',
  marginTop: isSmallDevice ? 20 : 30,
  alignItems: 'center',
});

const PizzaImg = styled.Image({
  width: isSmallDevice ? 200 : 250,
  height: isSmallDevice ? 200 : 250,
});

const PizzaPrice = styled.Text({
  fontSize: normalize(32),
  marginTop: 5,
  color: '#724720',
  fontWeight: 700,
});

const ToppingWrapper = styled.ScrollView({
  width: deviceWidth * 0.9,
  marginLeft: deviceWidth * 0.05,
  marginTop: 10,
  maxHeight: deviceHeight / 5.5,
});

const ToppingItemWrapper = styled.TouchableOpacity(
  {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    height: '90%',
    width: 130,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
  ({ isSelected }: { isSelected: boolean }) => ({
    backgroundColor: isSelected ? 'rgba(0,0,0, 0.2)' : '#fff',
  }),
);

const ToppingItemImage = styled.ImageBackground({
  width: '100%',
  height: '100%',
  zIndex: 0,
  justifyContent: 'center',
  alignItems: 'center',
});

const ToppingItemText = styled.Text({
  fontSize: 18,
  textAlign: 'center',
  color: '#000',
});

const Label = styled.Text({
  fontSize: normalize(16),
  marginTop: 20,
  textAlign: 'center',
  color: 'rgba(0,0,0, 0.5)',
});

const Layer = styled.View(
  {
    backgroundColor: 'rgba(0,0,0, 0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    zIndex: 500,
  },
  ({ isSelected }: { isSelected: boolean }) => ({
    backgroundColor: isSelected ? 'rgba(0,0,0, 0.8)' : 'rgba(0,0,0, 0.3)',
  }),
);

const TextBackground = styled.View({
  width: '100%',
  backgroundColor: '#fff',
  height: 40,
  zIndex: 120,
  justifyContent: 'center',
  alignItems: 'center',
});

const RemoveToppingButton = styled.TouchableOpacity({
  position: 'absolute',
  top: 10,
  right: 10,
  width: 25,
  height: 25,
  borderRadius: 10,
  zIndex: 50,
});

const RemoveToppingIcon = styled.Image({
  width: 25,
  height: 25,
  borderRadius: 10,
});

const ButtonWrapper = styled.TouchableOpacity({
  width: deviceWidth * 0.9,
  height: 50,
  borderRadius: 10,
  marginTop: isSmallDevice ? 15 : 30,
  marginLeft: deviceWidth * 0.05,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#8B0000',
  backgroundColor: 'rgba(114,71,32, 1)',
});

const ButtonText = styled.Text({
  fontSize: normalize(24),
  color: '#fff',
});

interface ToppingInterface {
  name: string;
  image: ImageSourcePropType;
}

const ChooseToppings: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pizzaState: PizzaState = useSelector(
    (state: ApplicationState) => state.pizza,
  );

  const [toppingLimit, setToppingLimit] = useState<number>(7);
  const [aditionalValue, setAditionalValue] = useState<number>(0);
  const [selectedToppings, setSelectedToppings] = useState<
    ToppingInterface[] | []
  >([]);

  // 0- Small / 1- Medium / 2-Large
  const toppingLimits = {
    0: 5,
    1: 7,
    2: 9,
  };

  useEffect(() => {
    setToppingLimit(toppingLimits[pizzaState.size]);
  }, []);

  const handleNextScreen = (): void => {
    dispatch(
      PizzaActions.setPizzaToppings({
        totalValue: pizzaState.totalValue + aditionalValue,
        selectedToppings,
      }),
    );
    setAditionalValue(0);
    navigation.navigate(ROUTES.CHECK_ORDER);
  };

  const toppings: ToppingInterface[] = [
    {
      name: 'Pepperoni',
      image: IMAGES.pepperoniLabel,
    },
    {
      name: 'Mushrooms',
      image: IMAGES.champignonLabel,
    },
    {
      name: 'Onions',
      image: IMAGES.onionLabel,
    },
    {
      name: 'Sausage',
      image: IMAGES.sausageLabel,
    },
    {
      name: 'Bacon',
      image: IMAGES.baconLabel,
    },
    {
      name: 'Extra cheese',
      image: IMAGES.cheeseLabel,
    },
    {
      name: 'Black olives',
      image: IMAGES.blackOlivesLabel,
    },
    {
      name: 'Green peppers',
      image: IMAGES.greenPepperLabel,
    },
    {
      name: 'Pineapple',
      image: IMAGES.pineappleLabel,
    },
    {
      name: 'Spinach',
      image: IMAGES.spinachLabel,
    },
  ];

  const handleIsSelected = (topping: ToppingInterface): boolean => {
    return selectedToppings.some(
      (selectedItem) => selectedItem.name === topping.name,
    );
  };

  const handleToppingClick = (topping: ToppingInterface): void => {
    if (selectedToppings.length === toppingLimit) {
      // eslint-disable-next-line no-alert
      alert('You reached the maximum ingredients for this pizza size');
      return;
    }

    if (selectedToppings.length >= 3) {
      setAditionalValue(aditionalValue + 0.5);
    }

    setSelectedToppings([...selectedToppings, topping]);
  };

  const handleRemoveTopping = (topping: ToppingInterface): void => {
    Alert.alert('Remove topping', 'Do you want to remove this topping?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: (): void => {
          const filteredArray = selectedToppings.filter(
            (item) => item.name !== topping.name,
          );

          if (filteredArray.length >= 3) {
            setAditionalValue(aditionalValue - 0.5);
          }

          setSelectedToppings([...filteredArray]);
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <>
      <Header
        headerLeft={
          <HeaderBackButton onPress={(): void => navigation.goBack()}>
            <HeaderBackImage source={arrowLeft} />
          </HeaderBackButton>
        }
        headerCenter={
          <HeaderTitleWrapper>
            <HeaderTitleText>Choose coverage</HeaderTitleText>
          </HeaderTitleWrapper>
        }
      />
      <Container>
        <PizzaWrapper>
          <PizzaImg source={pizzaImg} />
          <PizzaPrice>
            {`$${(pizzaState.totalValue + aditionalValue)
              .toFixed(2)
              .replace('.', ',')}`}
          </PizzaPrice>
        </PizzaWrapper>

        <Label>Select coverage</Label>
        <ToppingWrapper horizontal showsHorizontalScrollIndicator={false}>
          {toppings.map((item: ToppingInterface) => (
            <ToppingItemWrapper
              isSelected={handleIsSelected(item)}
              key={item.name}
              disabled={handleIsSelected(item)}
              onPress={(): void => handleToppingClick(item)}>
              {handleIsSelected(item) && (
                <RemoveToppingButton
                  onPress={(): void => handleRemoveTopping(item)}>
                  <RemoveToppingIcon source={IMAGES.closeIcon} />
                </RemoveToppingButton>
              )}

              <ToppingItemImage
                source={item.image}
                resizeMode="cover"
                imageStyle={{ borderRadius: 10 }}>
                <TextBackground>
                  <ToppingItemText>{item.name}</ToppingItemText>
                </TextBackground>
                <Layer isSelected={handleIsSelected(item)} />
              </ToppingItemImage>
            </ToppingItemWrapper>
          ))}
        </ToppingWrapper>

        <ButtonWrapper onPress={handleNextScreen}>
          <ButtonText>Next</ButtonText>
        </ButtonWrapper>
      </Container>
    </>
  );
};

export default ChooseToppings;
