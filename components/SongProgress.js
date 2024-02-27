//bMay
//A component which displays a percentage it is given, as progress along a bar.

//Import of necessary library
import { View } from 'react-native';

//The function which is exported as the component. Takes in the progress value, background colour and fill colour.
export default function SongProgress({ progress, bgColor, fillColor }) {

    //Styling for the encapsulating shape for the progress bar.
    const parentView = {
        height: '100%',
        width: '100%',
        backgroundColor: bgColor,
        borderRadius: 40,
    }

    //Styling for internal section of the progres bar.
    const childView = {
        height: '100%',
        backgroundColor: fillColor,
        borderRadius: 40,
        zIndex: 1,
    }

    //The visible portion of the component. Comprised of a 'View' component which is more or less a HTML Div component, which wraps around another 'View' component, the 'child' takes in the progress and sets its width based on that given value.
    return(
        <View style={parentView}>
            <View style={[childView, { width: progress+'%' }]}/>
        </View>
    );
}