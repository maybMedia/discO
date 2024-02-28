//bMay
//A component for the buttons which control the state of the media playback.
//27-02-24

//Import of the necessary component from the library.
import { IconButton } from "react-native-paper";

//The function which is exported as the component. Takes in the desired icon and the action to be completed when pressed.
export default function mediaControl({ icon, onPress }) {
    return(
        //The Icon Button component we imported. Gets the necessary icon and on press function. Animates the change of icon when a state is updated. Has a size of '40', default displaying of icon and has a colour similar to grey.
        <IconButton icon={icon} onPress={onPress} animated='true' size={40} mode="default" color='#ffffff'></IconButton>
    );
}