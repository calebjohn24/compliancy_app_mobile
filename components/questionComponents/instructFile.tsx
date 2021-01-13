import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text, Linking } from 'react-native';


interface ScreenState {
};

interface ScreenProps {
    'instructFile': any
}


export default class InstructFile extends React.Component<ScreenProps, ScreenState>{
    constructor(props: any) {
        super(props);
        this.state = {

        };

    }


    
    render() {
        return (


            <View style={styles.container}>

                <Text style={styles.textLightLg}>{this.props.instructFile.label}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(this.props.instructFile.data)}>
                    <Image style={styles.ImgLg} source={require('../../assets/icons/file-preview-green.png')} />
                </TouchableOpacity>


            </View>


        );
    }
}




const styles = StyleSheet.create({
    container: {
        height: "auto",
        marginHorizontal: 5,
        marginVertical:10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderWidth: 5,
        borderColor: '#00A878',
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
        marginVertical: 10
    },
    textLight: {
        fontWeight: "400",
        fontSize: 16,
        color: "white",
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 10
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
        marginHorizontal: 10,
        marginVertical: 5
    },
    maxImg: {
        width: "95%",
        height: 350,
        resizeMode: "contain",
        marginHorizontal: 10,
        marginVertical: 5,
    },
    ImgLg: {
        width: 65,
        height: 65,
        resizeMode: 'contain',
        marginVertical: 15
    },

});



