import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { useFonts, Gafata_400Regular } from '@expo-google-fonts/gafata';

import ImageViewer from './components/ImageViewer';
import PrefButton from './components/PrefButton';
import SongProgress from './components/SongProgress';

// import { ProgressBar } from 'react-native-paper';

const albumImage = 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png';

export default function App() {

  let [fontsLoaded, fontError] = useFonts({
    Gafata_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.songDataContainer}>

          <ImageViewer imageSource={{uri: albumImage}} />

          <Text id='title' style={styles.songTitle}>Money</Text>
          <Text id='artist' style={styles.songArtist}>Pink Floyd</Text>

          <View style={styles.songProgressContainer}>
            <SongProgress style={styles.songProgress} progress={'37%'} bgColor={'#353535'} fillColor={'#ffffff'}></SongProgress>
          </View>
          <View style={styles.songProgressLabels}>
            <Text id='songCompleted' style={styles.songProgText}>1:45</Text>
            <Text id='songRemaining' style={styles.songProgText}>-4:38</Text>
          </View>

        </View>
        
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonsRow}>

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
    // overflow: 'hidden',
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
  songTitle: {
    fontFamily: 'Gafata_400Regular',
    fontSize: 28,
    letterSpacing: 1,
    color: '#001A4B',
    padding: 5,
  },
  songArtist: {
    fontFamily: 'Gafata_400Regular',
    fontSize: 20,
    letterSpacing: 0,
    color: '#353535',
  },
  songProgressContainer: {
    marginHorizontal: 'auto',
    marginTop: 20,
    marginBottom: 5,
    height: 4,
    width: '90%',
  },
  songProgress: {
    marginVertical: 20,
    width: '100%',
    backgroundColor: 'rgba(100, 100, 100, 0.5)',
  },
  songProgressLabels: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  songProgText: {
    fontFamily: 'Gafata_400Regular',
    fontSize: 12,
  },
});
