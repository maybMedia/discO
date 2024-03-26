//bMay
//A button component for the preference selection section with a linear gradient background.

//Importing of necessary libraries and components.
import { StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconButton } from 'react-native-paper';

//The function which is exported as the preference button component. Takes in the two coordinates for the gradient, specifying the angle, the icon and the onpress action.
export default function PrefButton({ start, end, icon, onPress}) {
    return(
        //Button encapsulated by a linear gradient background.
        <LinearGradient 
              colors={['#001A4B', '#566279']} 
              start={start}
              end={end}
              style={styles.buttonBg}>
              <IconButton icon={icon} iconColor='white' size={60} onPress={onPress} style={{
                // backgroundColor: '#566279',
                // borderRadius: 100,
              }}></IconButton>
            </LinearGradient>
    );
}

//Styles as an object which can be referenced
const styles = StyleSheet.create({
    buttonBg: {
        borderRadius: 100,
        margin: 5,
    },
});