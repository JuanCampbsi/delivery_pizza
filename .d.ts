declare module '*.png' {
  const value: any;
  export = value;
}

declare module "*.jpg" {
  const image: string;
  export default image;
}

declare module 'react-native-vector-icons/MaterialIcons';
declare module '*.png';

declare module 'react-navigation/native';

interface CameraProps {
  isVisible: boolean;
  onChangePhoto(uri: string): void;
  onCloseCamera(): void;
}


