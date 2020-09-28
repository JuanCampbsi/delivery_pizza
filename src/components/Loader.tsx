import React, { FC } from 'react';
import LottieView from 'lottie-react-native';

import loaderJson from '../resources/lottieFiles/pizza-loader.json';

const Loader: FC = () => <LottieView source={loaderJson} autoPlay />;

export default Loader;
