import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

import ImageViewer from './components/ImageViewer';
import PrefButton from './components/PrefButton';

import { Button, IconButton } from 'react-native-paper';

const albumImage = 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.songDataContainer}>
          <ImageViewer imageSource={{uri: albumImage}} />
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

            {/* <LinearGradient 
              colors={['#001A4B', '#566279']} 
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonBg}>
              <IconButton icon='emoticon-sad' iconColor='white' size={80} onPress={() => console.log('Pressed')} style={{
                // // backgroundColor: '#566279',
                // borderRadius: 100,
              }}></IconButton>
            </LinearGradient> */}

            <PrefButton start={{x: 0, y: 0}} end={{x: 1, y:1}} icon={'emoticon-sad'} onPress={() => console.log('Pressed')}></PrefButton>
            <PrefButton start={{x: 0.5, y: 0}} end={{x: 0.5, y:1}} icon={'emoticon-neutral'} onPress={() => console.log('Pressed')}></PrefButton>
            <PrefButton start={{x: 1, y: 0}} end={{x: 0, y:1}} icon={'emoticon-happy'} onPress={() => console.log('Pressed')}></PrefButton>

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
    paddingTop: 58,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  songDataContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    height: '70%',
    maxHeight: 580,
    width: '90%',
    maxWidth: 410,
    padding: 10,
    alignItems: 'center',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100,
    width: '90%',
    maxWidth: 410,
  },
  buttonsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
