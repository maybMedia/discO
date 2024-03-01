//bMay
//A component which displays the image provided in the source property
//27-02-24

import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

//Importing of necessary libraries for this component
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

//A string which is understood by the Expo Image component to display a 'blurhash' which is a compact representation of an image. Displayed as a placeholder while the images are retrieved from the web.
const blurHash = 'UICi{zRl~qt6t7WCaxj@_3xZWCWVM|t5kCWC'

//The function which is output as the component. Takes in the image source property.
export default function ImageViewer({ imageSource }) {
  return (
    //Displays the 'Image' component from the Expo Image library, gets the source from the property, takes in the placeholder hash, takes 750ms to change from hash to image once retrieved, fits the content within the alloted space rather than stretching, takes in styling from below function.
    <Image source={imageSource} placeholder={blurHash} transition={750} contentFit="cover" style={styles.image} />
  );
}

//Stores the styles for the component as an object.
const styles = StyleSheet.create({
  image: {
    width: '98%',
    maxWidth: 320,
    aspectRatio: '1',
    borderRadius: 18,
    marginHorizontal: 'auto',
  },
});
