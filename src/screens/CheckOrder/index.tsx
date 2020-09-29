import React, { FC, useState, useRef } from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import { Animated, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../../state';
import { isSmallDevice, deviceWidth, deviceHeight } from '../../utils/Layout';
import PizzaActions from '../../state/ducks/Pizza/actions';
import pizzaImg from '../../resources/images/pizza.png';
import { PizzaState } from '../../state/ducks/Pizza/types';
import Header from '../../components/Header';
import normalize from '../../utils/normalize';
import boxJson from '../../resources/lottieFiles/box-closing.json';
import partyJson from '../../resources/lottieFiles/party.json';
import arrowLeft from '../../resources/images/left-arrow.png';

const ContentContainerAnimated = styled(Animated.View)({
  flex: 1,
  backgroundColor: '#F5DEB3',

});


const BoxContainer = styled(Animated.View)({
  flex: 5,
 
});

const SuccessModal = styled(Animated.View)({
  width: deviceWidth * 0.9,
  opacity: 1,
  left: deviceWidth * 0.05,
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'absolute',
  top: deviceHeight / 2 - 150,
  borderRadius: 20,
  padding: 20,
  backgroundColor: '#F5DEB3',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.5,
  shadowRadius: 4,
  elevation: 10,
});

const ButtonModal = styled.TouchableOpacity({
  width: '80%',
  height: 50,
  borderRadius: 10,
  marginTop: isSmallDevice ? 15 : 30,
  marginBottom: isSmallDevice ? 50 : 0,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#c1c1c1',
  backgroundColor: 'rgba(114,71,32, 1)',
});

const SucessTitle = styled.Text({
  fontSize: 24,
  color: '#7e512a',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: 20,
});

const GoToBeginText = styled.Text({
  fontSize: 18,
  color: '#7e512a',
  textAlign: 'center',
});

const PizzaAnimated = styled(Animated.Image)({
  position: 'absolute',
  bottom: 0,
  width: 400,
  height: 400,
  left: deviceWidth / 2 - 200,
});

const Container = styled.ScrollView({
  flex: 1,
  backgroundColor: '#F5DEB3',
  padding: 20,
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

const ConfirmOrderText = styled.Text({
  fontSize: normalize(32),
  color: '#7e512a',
  marginTop: 10,
  marginLeft: 10,
  textAlign: 'center'
});

const ConfirmTable = styled.View({
  marginTop: 20,
  width: '100%',
  marginBottom: 20,
});

const TableLine = styled.View({
  height: 45,
  padding: 10,
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderBottomWidth: 1,
  borderBottomColor: '#c1c1c1',
});

const LineText = styled.Text(
  {
    fontSize: 18,
    color: '	#CD950C',
  },
  ({ isTitle }: { isTitle?: boolean }) => ({
    fontWeight: isTitle ? 700 : 400,
  }),
);

const ToppingsWrapper = styled.View({
  paddingLeft: 10,
  width: '100%',
  borderBottomWidth: 1,
  borderBottomColor: '#c1c1c1',
  marginBottom: 20,
  paddingBottom: 10,
});

const ButtonWrapper = styled.TouchableOpacity({
  width: deviceWidth * 0.9,
  height: 50,
  borderRadius: 10,
  marginTop: isSmallDevice ? 15 : 30,
  marginBottom: isSmallDevice ? 50 : 0,
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

const ToppingTitle = styled.Text({
  fontSize: 18,
  color: '#7e512a',
  marginBottom: 15,
  fontWeight: 700,
});

const ToppingItem = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const Circle = styled.View({
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: '#7e512a',
  marginRight: 10,
});

interface ToppingInterface {
  name: string;
  image: ImageSourcePropType;
}

const CheckOrder: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pizzaState: PizzaState = useSelector(
    (state: ApplicationState) => state.pizza,
  );

  const [headerShown, setHeaderShown] = useState<boolean>(true);
  const [containerPosition] = useState(new Animated.Value(1));
  const [boxPosition] = useState(new Animated.Value(-deviceWidth));
  const [modalScale] = useState(new Animated.Value(0));
  const [pizzaAnimated] = useState({
    position: new Animated.Value(deviceHeight),
    scale: new Animated.Value(0.5),
  });

  const lottieRef = useRef(null);

  const animations = Animated.sequence([
    Animated.timing(containerPosition, {
      toValue: deviceWidth,
      duration: 200,
      useNativeDriver: true,
    }),

    Animated.delay(500),

    Animated.timing(boxPosition, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }),

    Animated.timing(pizzaAnimated.position, {
      toValue: 50,
      duration: 1000,
      useNativeDriver: true,
    }),

    Animated.delay(1000),

    Animated.parallel([
      Animated.timing(pizzaAnimated.position, {
        toValue: -deviceHeight / 3,
        duration: 1500,
        useNativeDriver: true,
      }),

      Animated.timing(pizzaAnimated.scale, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]),
  ]);

  const lastAnimation = Animated.sequence([
    Animated.timing(boxPosition, {
      toValue: deviceWidth,
      duration: 500,
      useNativeDriver: true,
    }),

    Animated.spring(modalScale, {
      toValue: 1,
      bounciness: 5,
      useNativeDriver: true,
    }),
  ]);

  const handleConfirm = (): void => {
    animations.start((): void => {
      lottieRef?.current?.play();
      setTimeout(() => {
        lastAnimation.start();
      }, 3000);
    });
    setTimeout(() => {
      setHeaderShown(false);
    }, 500);
  };

  const handleModalButton = (): void => {
    dispatch(PizzaActions.resetPizzaState());
  };

  const sizeStringfied = {
    0: 'Small',
    1: 'Medium',
    2: 'Large',
  };

  const crustStringfied = {
    0: 'Thin',
    1: 'Thick',
  };

  return (
    <>
      {headerShown && (
        <Header
          headerLeft={
            <HeaderBackButton onPress={(): void => navigation.goBack()}>
              <HeaderBackImage source={arrowLeft} />
            </HeaderBackButton>
          }
          headerCenter={
            <HeaderTitleWrapper>
              <HeaderTitleText>Order</HeaderTitleText>
            </HeaderTitleWrapper>
          }
        />
      )}

      {/* Transitions */}

      {!headerShown && (
        <>
          <BoxContainer
            style={{
              transform: [
                {
                  translateX: boxPosition,
                },
              ],
            }}>
            <LottieView source={boxJson} ref={lottieRef} loop={false} />
          </BoxContainer>

          <PizzaAnimated
            source={pizzaImg}
            resizeMode="contain"
            style={{
              transform: [
                {
                  translateY: pizzaAnimated.position,
                },
                { scale: pizzaAnimated.scale },
              ],
            }}
          />
        </>
      )}

      <SuccessModal
        style={{
          transform: [{ scale: modalScale }],
        }}>
        <LottieView
          source={partyJson}
          loop
          autoPlay
          style={{ width: 100, height: 100 }}
        />
        <SucessTitle>Your order is on its way !</SucessTitle>
        <GoToBeginText>Do you want to order another pizza ?</GoToBeginText>
        <ButtonModal onPress={handleModalButton}>
          <ButtonText>Yes!</ButtonText>
        </ButtonModal>
      </SuccessModal>

      {/* End Transitions */}

      <ContentContainerAnimated
        style={{
          transform: [
            {
              translateX: containerPosition,
            },
          ],
        }}>
        <Container>
          <ConfirmOrderText>Confirm your pizza</ConfirmOrderText>
          <ConfirmTable>
            <TableLine>
              <LineText isTitle>Size</LineText>
              <LineText>{sizeStringfied[pizzaState.size]}</LineText>
            </TableLine>

            <TableLine>
              <LineText isTitle>Crust</LineText>
              <LineText>{crustStringfied[pizzaState.crust]}</LineText>
            </TableLine>
          </ConfirmTable>

          <ToppingsWrapper>
            <ToppingTitle>Pizza&apos;s topping</ToppingTitle>
            {pizzaState.selectedToppings.length <= 0 && (
              <LineText>No pizza topping selected</LineText>
            )}
            {pizzaState.selectedToppings.map((item: ToppingInterface) => (
              <ToppingItem>
                <Circle />
                <LineText>{item.name}</LineText>
              </ToppingItem>
            ))}
          </ToppingsWrapper>

          <TableLine>
            <LineText isTitle>Total</LineText>
            <LineText>
              {`$${pizzaState.totalValue.toFixed(2).replace('.', ',')}`}
            </LineText>
          </TableLine>

          <ButtonWrapper onPress={handleConfirm}>
            <ButtonText>Confirm</ButtonText>
          </ButtonWrapper>
        </Container>
      </ContentContainerAnimated>
    </>
  );
};

export default CheckOrder;
