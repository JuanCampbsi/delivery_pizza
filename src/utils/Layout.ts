import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get('screen');

const statusBarHeight = getStatusBarHeight();
const headerBarHeight = statusBarHeight + 50;
const deviceWidth = width;
const deviceHeight = height;
const isSmallDevice = height < 700;

export {
  statusBarHeight,
  headerBarHeight,
  deviceWidth,
  deviceHeight,
  isSmallDevice,
};
