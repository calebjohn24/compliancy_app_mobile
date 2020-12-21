import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, YellowBox, TouchableOpacity, TextInput, ScrollView, Linking, SectionList, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as SecureStore from 'expo-secure-store';
import styles from '../../styles/systemRegistration/previewSystem'
import FireHoodModal from '../../components/fire-hood/fireHoodInfo'





interface ScreenState {
    'compId': any,
    'systemInfo':any,
    'email': string,
    'name': string,
    'owner':string,
    'phone': string
};

interface ScreenProps {
    navigation: any
}

export default class systemPreviewPanel extends React.Component<ScreenProps, ScreenState> {

    constructor(props: any) {
        super(props);
        this.state = {
            'compId': '',
            'systemInfo':{},
            'email': '',
            'name': '',
            'owner':'',
            'phone': ''
        };

    }


    goToHome = () => {
        this.props.navigation.navigate('HomeNav');
    }

    render() {

        
        return (
            <View>

                <View style={styles.containerTop}>

                <View style={styles.logoBox}>
                    <TouchableOpacity onPress={this.goToHome}>

                        <Image style={styles.tinyLogo} source={require('../../assets/icons/check-green.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.topBar}>
                    <Text style={styles.dispNameText}>Registration Submitted</Text>
                </View>
                </View>
                
            </View>


        );

    }
}



