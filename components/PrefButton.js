import { PaperProvider } from 'react-native-paper';
import { StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconButton } from 'react-native-paper';

export default function PrefButton({ start, end, icon, onPress}) {
    return(
        <LinearGradient 
              colors={['#001A4B', '#566279']} 
              start={start}
              end={end}
              style={styles.buttonBg}>
              <IconButton icon={icon} iconColor='white' size={60} onPress={onPress} style={{
                // // backgroundColor: '#566279',
                // borderRadius: 100,
              }}></IconButton>
            </LinearGradient>
    );
}

const styles = StyleSheet.create({
    buttonBg: {
        borderRadius: 100,
        margin: 5,
    },
});