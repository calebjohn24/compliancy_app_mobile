import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text, Linking } from 'react-native';
import { CheckBox } from 'react-native-elements'

interface ScreenState {
    'selectedResponses':any,
    'procResps':any,
    'checked':boolean
};

interface ScreenProps {
    'responses': any,
}


export default class CheckAns extends React.Component<ScreenProps, ScreenState>{
    constructor(props: any) {
        super(props);
        this.state = {
            selectedResponses:{},
            procResps:{},
            checked:false
        };

    }





    render() {
        return (
            <View>
                
                    <View style={styles.container}>
                        <Text style={styles.textBold}>Select ALL That Apply</Text>
                        <CheckBox
                        onPress={() => this.setState({checked: !this.state.checked})}
                        title='Click Here'
                        checked={this.state.checked}
                        
                        />
                    </View>


            </View>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        height: "auto",
        marginVertical: 5,
        marginHorizontal: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
        margin:10
    },
    textLight: {
        fontWeight: "400",
        fontSize: 16,
        color: "white",
        marginHorizontal:10,
        marginTop:5,
        marginBottom:10
    },
    textLightSm: {
        fontWeight: "400",
        fontSize: 16,
        color: "white",
        textAlign: 'auto'
    },
    textLightLg: {
        fontWeight: "400",
        fontSize: 20,
        color: "white",
        marginHorizontal:10,
        marginVertical:5
    },
    maxImg: {
        width: "95%",
        height: 350,
        resizeMode:"contain",
        marginHorizontal:10,
        marginVertical:5,
    }

});



