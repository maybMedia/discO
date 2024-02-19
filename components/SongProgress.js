import { View } from 'react-native';

export default function SongProgress({ progress, bgColor, fillColor }) {

    const parentView = {
        height: '100%',
        width: '100%',
        backgroundColor: bgColor,
        borderRadius: 40,
    }

    const childView = {
        height: '100%',
        backgroundColor: fillColor,
        borderRadius: 40,
        zIndex: 1,
    }

    return(
        <View style={parentView}>
            <View style={[childView, { width: progress }]}/>
        </View>
    );
}