//bMay
//The main page for the discO song preference generator app. Provides users with an interface between their listening habits and the songs they want to listen to and discover by feeding them with potentially enjoyable songs for their taste.

import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { useFonts, Gafata_400Regular } from '@expo-google-fonts/gafata';

import ImageViewer from './components/ImageViewer';
import PrefButton from './components/PrefButton';
import SongProgress from './components/SongProgress';
import MediaControl from './components/MediaButton';

import { Icon, SegmentedButtons } from 'react-native-paper';

const albumImage = 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png';
const bg = require('./assets/background.svg');

export default function App() {

  const [playbackStatus, setPlaybackStatus] = React.useState(true);
  const [segmentValue, setSegmentValue] = React.useState('home');
  const [songProgress, setSongProgress] = React.useState(37);

  let [fontsLoaded, fontError] = useFonts({
    Gafata_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PaperProvider>
      <ImageBackground source={bg} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Discover</Text>
          <SegmentedButtons
            style={styles.segmentSelector}
            value={segmentValue}
            onValueChange={setSegmentValue}
            density='medium'
            theme={{
              colors: {
                secondaryContainer: '#E5F1FF'
              }
            }}
            buttons={[
              // {
              //   value:"social",
              //   //label: "Social",
              //   icon: "account-supervisor-circle",
              //   onPress: () => {console.log("Social Tab")},
              // },
              {
                value:"home",
                //label: "Discover",
                icon: "music-circle-outline",
                onPress: () => {console.log("Discover Tab")},
              },
              {
                value:"profile",
                //label: "You",
                icon: 'face-man-profile',
                onPress: () => {console.log("Your Profile Tab")},
              },
            ]}
          ></SegmentedButtons>
        </View>

        <View style={styles.songDataContainer}>

          <ImageViewer imageSource={{uri: albumImage}} />

          <Text id='title' style={styles.songTitle}>Money</Text>
          <Text id='artist' style={styles.songArtist}>Pink Floyd</Text>

          <View style={styles.songProgressContainer}>
            <SongProgress style={styles.songProgress} progress={songProgress} bgColor={'rgba(255, 255, 255, 0.25)'} fillColor={'#001A4B'}></SongProgress>
          </View>
          <View style={styles.songProgressLabels}>
            <Text id='songCompleted' style={styles.songProgText}>1:45</Text>
            <Text id='songRemaining' style={styles.songProgText}>-4:38</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.infoContainer}>
              <Icon style={styles.statsIcon} size={20} source='album'></Icon>
              <Text style={styles.statsText}>The Dark Side Of The Moon</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon style={styles.statsIcon} size={20} source='calendar'></Icon>
              <Text style={styles.statsText}>1973</Text>
            </View>
          </View>

          <View style={styles.mediaControls}>
            <MediaControl icon={'step-backward-2'} onPress={() => console.log('Go Back')}></MediaControl>
            <MediaControl icon={playbackStatus ? 'pause' : 'play'} onPress={() => {
              playbackStatus ? setPlaybackStatus(false) : setPlaybackStatus(true)
            }}></MediaControl>
            <MediaControl icon={'step-backward'} onPress={() => console.log('Go to start')}></MediaControl>
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
      </ImageBackground>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 58,
    backgroundColor: '#25292e',
    alignItems: 'center',
    height: '100%',
  },
  songDataContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    height: '70%',
    maxHeight: 560,
    width: '90%',
    maxWidth: 340,
    padding: 10,
    alignItems: 'center',
    // overflow: 'hidden',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100,
    width: '90%',
    maxWidth: 340,
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
  statsContainer: {
    width: '90%',
    margin: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
  },
  statsIcon: {
    color: '#353535',
  },
  statsText: {
    marginLeft: 4,
    fontFamily: 'Gafata_400Regular',
    fontSize: 16,
  },
  mediaControls: {
    flexDirection: 'row',
    marginHorizontal: 'auto',
  },
  header: {
    width: '85%',
    maxWidth: 320,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageTitle: {
    fontFamily: 'Gafata_400Regular',
    fontSize: 42,
    color: '#ffffff',
    textAlign: 'left',
    width: '50%',
  },
  segmentSelector: {
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 50,
    height: 30,
    marginLeft: 5,
  },
});
