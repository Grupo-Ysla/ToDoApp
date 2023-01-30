import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize) - 2) || 0;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2 || 0;
  }
}

export { SCREEN_WIDTH, SCREEN_HEIGHT };
