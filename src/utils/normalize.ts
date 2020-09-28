import { Dimensions, PixelRatio } from 'react-native';

const { width } = Dimensions.get('window');

const scale = width / 360;

const normalize = (size: number): number => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export default normalize;
