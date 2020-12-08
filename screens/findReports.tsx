import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, YellowBox, TouchableOpacity, TextInput, ScrollView, Linking, SectionList, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as SecureStore from 'expo-secure-store';
import homePanel from './home'
import RootStack from '../App'
import { FlatList } from 'react-native';
import styles from '../assets/styles/findReports'

export default class infoPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'dispName': '',
            'compInfo': {},
            'userInfo': {},
            'compId': ''
        };

    }


    componentDidMount = async () => {

        try {


            let compId = await SecureStore.getItemAsync('compId');
            let userId = await SecureStore.getItemAsync('id');
            let token = await SecureStore.getItemAsync('token');
            //var token = SecureStore.getItemAsync('token');
            this.state.compId = compId;

            return fetch('https://1ab18b31c7bb.ngrok.io/api/user-info', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    compId: compId,
                    userId: userId,
                    token: token
                }),
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState(
                        {
                            logo: responseJson.logo,
                            dispName: responseJson.dispName,
                            compInfo: responseJson.compInfo,
                            userInfo: responseJson.userInfo
                        },
                        function () {
                            this.state.logo = responseJson.logo
                            this.state.dispName = responseJson.dispName
                            this.state.compInfo = responseJson.compInfo,
                                this.state.userInfo = responseJson.userInfo
                            this.state.pageLoaded = true
                        }
                    );
                })
                .catch(error => {
                    alert("Cannot Reach Server")
                });




        } catch (error) {
            console.log(error)
            alert("Cannot Reach Server")
        }
    }

    goToHome = () => {
        this.props.navigation.navigate('HomeNav');
    }

   

    render() {


        return (
            <View style={{ backgroundColor: '#212126' }}>









            </View>
        );
    }
}


