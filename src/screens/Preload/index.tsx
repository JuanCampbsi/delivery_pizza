import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

import Loader from '../../components/Loader';

const Container = styled.SafeAreaView({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F5F5DC',
});

const Preload: FC = () => {
  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Loader />
    </Container>
  );
};

export default Preload;
