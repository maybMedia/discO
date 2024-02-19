import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import ImageViewer from './components/ImageViewer';
import { Button, IconButton, MD3Colors } from 'react-native-paper';

const PlaceHolderImage = 'https://docs.expo.dev/static/images/tutorial/background-image.png';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.songDataContainer}>
          <ImageViewer placeholderImageSource={{uri: PlaceHolderImage}} />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonsRow}>
            {/* <Button icon='emoticon-happy' mode="contained" onPress={() => console.log('Pressed')} compact='false' style={{
              margin: 10,
            }}>Like</Button>
            <Button icon='emoticon-neutral' mode="contained" onPress={() => console.log('Pressed')} compact='false' style={{
              margin: 10,
            }}>Neutral</Button>
            <Button icon='emoticon-sad' mode="contained" onPress={() => console.log('Pressed')} compact='false' style={{
              margin: 10,
            }}>Dislike</Button> */}

            <IconButton icon='emoticon-happy' iconColor='white' size={80} onPress={() => console.log('Pressed')} style={{
              margin: 10,
            }}></IconButton>
            <IconButton icon='emoticon-neutral' iconColor='white' size={80} onPress={() => console.log('Pressed')} style={{
              margin: 10,
            }}></IconButton>
            <IconButton icon='emoticon-sad' iconColor='white' size={80} onPress={() => console.log('Pressed')} style={{
              margin: 10,
            }}></IconButton>

          </View>
        </View>
        <StatusBar style='auto'/>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  songDataContainer: {
    flex: 1,
    paddingTop: 58,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100,
  },
  buttonsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
