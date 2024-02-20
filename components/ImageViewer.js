import { StyleSheet, Image } from 'react-native';

const blurHash = 'UICi{zRl~qt6t7WCaxj@_3xZWCWVM|t5kCWC'

export default function ImageViewer({ imageSource }) {
  return (
    <Image source={imageSource} placeholder={blurHash} transition={1000} contentFit="cover" style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '98%',
    maxWidth: 320,
    aspectRatio: '1',
    borderRadius: 18,
    marginHorizontal: 'auto',
  },
});
