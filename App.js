//bMay
//The main page for the discO song preference generator app. Provides users with an interface between their listening habits and the songs they want to listen to and discover by feeding them with potentially enjoyable songs for their taste.

//The imported libraries used are below. This includes the built in libraries from React and Expo, along with the component library I used and the font.
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { useFonts, Gafata_400Regular } from '@expo-google-fonts/gafata';
import { Comfortaa_600SemiBold, Comfortaa_300Light } from '@expo-google-fonts/comfortaa';
import { Image } from 'expo-image';
import * as AuthSession from "expo-auth-session";
import AsyncStorage from '@react-native-async-storage/async-storage';

//Imports for the components I made.
import ImageViewer from './components/ImageViewer';
import PrefButton from './components/PrefButton';
import SongProgress from './components/SongProgress';
import MediaControl from './components/MediaButton';

import { spotifyCredentials } from './secrets.js';

//Import the specific components I need from the component library.
import { Icon, SegmentedButtons, Button } from 'react-native-paper';

const bg = require('./assets/background.svg'); //Loads the background from file.

const scopesArr = ['user-read-playback-state','user-modify-playback-state','user-read-currently-playing','streaming','app-remote-control','playlist-read-private','playlist-read-collaborative','playlist-modify-private','playlist-modify-public','user-read-playback-position','user-top-read','user-read-recently-played',];
const scopes = scopesArr.join(' ');

function generateCodeVerifier(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
}

async function generateAccessToken(code) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", spotifyCredentials.clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:8081/callback");
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
  });

  if (!result.ok) {
    getAuth();
    return null; // or throw an error
  }

  const { access_token } = await result.json();
  console.log(access_token);
  return access_token;
}

async function getAuth () {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);
  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append('client_id', spotifyCredentials.clientId);
  params.append('response_type', 'code');
  params.append("redirect_uri", "http://localhost:8081/callback");
  params.append("scope", scopes);
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

//The program which is compiled and displayed by the browser or app view.
export default function App() {
  
  const [accessToken, setAccessToken] = React.useState('')

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  // const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
  
    if (code && !accessToken) {
      async function setToken(){
        setAccessToken(await generateAccessToken(code));
      }
      setToken();
    } else if (accessToken) {
      loadData(accessToken);
    }
  }, [accessToken]);

  async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
  }

  const [topTracks, setTopTracks] = React.useState();
  const [playbackStatus, setPlaybackStatus] = React.useState(false); //Initialises the React state for the current playback status
  const [segmentValue, setSegmentValue] = React.useState('home'); //Initialises the React state for the page which is visible
  const [songProgress, setSongProgress] = React.useState(0); //Initialises the React state for the progress completed by the song.
  const [albumImage, setAlbumImage] = React.useState('https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png'); //Loads the placeholder album image from the web server.
  // const [volume, setVolume] = React.useState(0.5);
  const [trackIndex, setTrackIndex] = React.useState(0);
  const [audio, setAudio] = React.useState();
  const [track, setTrack] = React.useState();


  //Initialises the font that we imported above
  let [fontsLoaded, fontError] = useFonts({
    Gafata_400Regular,
    Comfortaa_300Light,
    Comfortaa_600SemiBold,
  });

  //If no font loaded and there is no error message, do not display the app.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  function populateProfile(profile){
    if (profile.images[0]) {
      const profileImage = new Image(200, 200);
      profileImage.src = profile.images[0].url;
      document.getElementById("profile").setAttribute("src", profileImage.src);
  }}

  async function getTopTracks(accessToken) {
    const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch top tracks");
    }
  
    const data = await response.json();
    return data.items; // Assuming the API response contains an 'items' array of top tracks
  }

  // function setPlaybackVolume(volume){
  //   if(audio){
  //     audio.volume = volume;
  //     setVolume(volume);
  //   }
  // }

  function nextTrack(){
    getTrackPreview('pauseSong', track);
    setTrackIndex(trackIndex + 1);
    populateSongData(topTracks, trackIndex % 20); 
  }

  function getTrackPreview(instruction, selectedTrack){
    if (selectedTrack && selectedTrack.preview_url) {

      if(instruction === 'getSong'){
        const audio = new Audio(selectedTrack.preview_url);
        setAudio(audio);
        audio.volume = 0.5;
        audio.play();
        setPlaybackStatus(true);
      } else if(instruction === 'pauseSong'){
        audio.pause();
        setPlaybackStatus(false);
      } else if(instruction === 'playSong'){
        audio.play();
        setPlaybackStatus(true);
      } else if(instruction === 'restartSong'){
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      }
      
      audio.addEventListener('play', () => {
        console.log('Audio is playing');
      });

      audio.addEventListener('pause', () => {
        console.log('Audio is paused');
      });

      audio.addEventListener('ended', () => {
        console.log('Playback ended');
        setPlaybackStatus(false);
      });

    } else {
      console.error("No preview available for the selected track");
    }
  }

  async function populateSongData(topTracks, track){
    if (!topTracks || topTracks.length === 0) {
      console.error("No tracks found");
    }

    const selectedTrack = topTracks[track];
    setTrack(selectedTrack);

    if (!selectedTrack) {
      console.error("No track selected");
    }

    const trackName = selectedTrack.name || "Unknown Track";
    const artistName = selectedTrack.artists && selectedTrack.artists.length > 0 ? selectedTrack.artists[0].name : "Unknown Artist";
    const albumName = selectedTrack.album ? selectedTrack.album.name : "Unknown Album";
    const albumImage = selectedTrack.album && selectedTrack.album.images && selectedTrack.album.images.length > 0 ? selectedTrack.album.images[0].url : "";
    const trackYear = selectedTrack.album.release_date ? selectedTrack.album.release_date.slice(0, 4) : "Unknown Year";
    const trackDuration = selectedTrack.duration_ms ? formatTime(selectedTrack.duration_ms / 1000) : 0;

    const songTitle = document.getElementById('title');
    const songArtist = document.getElementById('artist');
    const songAlbumName = document.getElementById('albumName');
    const songYear = document.getElementById('year');
    const songDuration = document.getElementById('duration');

    songTitle.textContent = trackName;
    songArtist.textContent = artistName;
    songAlbumName.textContent = albumName;
    songYear.textContent = trackYear;
    songDuration.textContent = trackDuration;
    setAlbumImage(albumImage);
    getTrackPreview('getSong', selectedTrack);
  }

  async function loadData(accessToken){
    // setAccessToken(await generateAccessToken(code));
    const profile = await fetchProfile(accessToken);
    console.log(profile);
    const topTracksReq = await getTopTracks(accessToken);
    console.log(topTracksReq);
    setTopTracks(topTracksReq);
    populateProfile(profile);
    populateSongData(topTracksReq, trackIndex);
  }

  

  if (code){ 

    return (
      <PaperProvider>
        <ImageBackground source={bg} style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.pageTitle}>discOver</Text>
            {/* <SegmentedButtons
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
            ></SegmentedButtons> */}
            <img src={''} id='profile' style={{width: 50, aspectRatio: 1, borderRadius: 100, margin: 2,}}></img>
          </View>

          <View style={styles.songDataContainer}>

            <ImageViewer id='album' imageSource={{uri: albumImage}} />
            
            {/* <input type="range" id="volumeSlider" min="0" max="1" step="0.1" defaultValue="0.5" onChange={() => {setPlaybackVolume(document.getElementById('volumeSlider').value);}}/> */}

            <Text id='title' style={styles.songTitle}>Money</Text>
            <Text id='artist' style={styles.songArtist}>Pink Floyd</Text>

            <View style={styles.songProgressContainer}>
              <SongProgress style={styles.songProgress} progress={songProgress} bgColor={'rgba(255, 255, 255, 0.25)'} fillColor={'#001A4B'}></SongProgress>
            </View>
            <View style={styles.songProgressLabels}>
              <Text id='songCompleted' style={styles.songProgText}>0:00</Text>
              <Text id='duration' style={styles.songProgText}>6:24</Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.infoContainer}>
                <Icon style={styles.statsIcon} color='#353535' size={20} source='album'></Icon>
                <Text id='albumName' style={styles.statsText}>The Dark Side Of The Moon</Text>
              </View>
              <View style={styles.infoContainer}>
                <Icon style={styles.statsIcon} color='#353535' size={20} source='calendar'></Icon>
                <Text id='year' style={styles.statsText}>1973</Text>
              </View>
            </View>

            <View style={styles.mediaControls}>
              <MediaControl icon={'step-backward-2'} onPress={() => getTrackPreview('restartSong', track)}></MediaControl>
              <MediaControl icon={playbackStatus ? 'pause' : 'play'} onPress={() => {
                playbackStatus ? getTrackPreview('pauseSong', track) : getTrackPreview('playSong', track)
              }}></MediaControl>
              <MediaControl icon={'step-forward'} onPress={() => nextTrack()}></MediaControl>
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
    );} else {

    async function authenticate () {
      getAuth();
    }

    return(
    <PaperProvider>
      <ImageBackground source={bg} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Login</Text>
        </View>
        <View style={styles.loginContainer}>
          <Icon source='spotify' size={96} color='#001A4B'></Icon>
          <Text style={styles.loginP}>Connect to <Text style={{color:'#1ED760', fontFamily: 'Comfortaa_600SemiBold'}}>Sp<Icon source='spotify' size={30} color='#1ED760'></Icon>tify</Text> to get started!</Text>
          <View style={{height: 80,}}/>
          <Button icon='spotify' mode='contained' textColor='#001A4B' buttonColor='#1ED760' onPress={authenticate} style={styles.loginButton}>Sign in with Spotify</Button>
        </View>
      </ImageBackground>
    </PaperProvider>
  )}
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
    width: '98%',
    textAlign: 'center',
    fontFamily: 'Gafata_400Regular',
    fontSize: 28,
    letterSpacing: 1,
    color: '#001A4B',
    padding: 5,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  songArtist: {
    width: '98%',
    textAlign: 'center',
    fontFamily: 'Gafata_400Regular',
    fontSize: 20,
    letterSpacing: 0,
    color: '#353535',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  songProgressContainer: {
    marginHorizontal: 'auto',
    marginTop: 20,
    marginBottom: 5,
    height: 2,
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
  loginContainer: {
    height: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '80%',
    margin: 10,
    borderRadius: 20,
    maxHeight: 560,
    maxWidth: 340,
    alignItems: 'center',
    padding: 20,
  },
  loginP: {
    fontFamily: 'Comfortaa_300Light',
    fontSize: 42,
    color: '#001A4B',
    textAlign: 'center',
    margin: 20,
  },
  loginButton: {
    width: '90%',
    height: 42,
    justifyContent: 'center',
  },
});
