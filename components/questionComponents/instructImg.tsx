import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text, Linking } from 'react-native';


interface ScreenState {
};

interface ScreenProps {
    'instructImg': any
}


export default class InstructImg extends React.Component<ScreenProps, ScreenState>{
    constructor(props: any) {
        super(props);
        this.state = {

        };

    }


    render() {
        return (
            <View>


                <View style={styles.container}>
                    <Text style={styles.textLightLg}>{this.props.instructImg.label}</Text>
    
                    <View style={{ width: "100%" }}>
                        <TouchableOpacity onPress={() => Linking.openURL(this.props.instructImg.data)}>
                            <Image style={styles.maxImg} source={{ uri: this.props.instructImg.data }} />
                        </TouchableOpacity>
                    </View>



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
        borderRadius: 15,
        borderWidth: 5,
        borderColor: '#1E96FC',
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
        margin: 10
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
    }

});



