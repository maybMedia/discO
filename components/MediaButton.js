import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

export default function mediaControl({ icon, onPress }) {
    return(
        <IconButton icon={icon} onPress={onPress} animated='true' size={40} mode="default" color='#353535'></IconButton>
    );
}