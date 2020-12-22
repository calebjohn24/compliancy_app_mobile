import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, YellowBox, TouchableOpacity, TextInput, ScrollView, Linking, SectionList, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as SecureStore from 'expo-secure-store';
import RootStack from '../App'
import { FlatList } from 'react-native';
import styles from '../styles/editInfo'
import LoadingIcon from '../components/loading'

export default class editInfoPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'changeType': '',
            'newData': '',
            'success': false,
        };

    }


    goToInfo = () => {
        this.props.navigation.navigate('InfoNav');
    }

    updateUserInfo = async () => {


        let compId = await SecureStore.getItemAsync('compId');
        let token = await SecureStore.getItemAsync('token');
        let userId = await SecureStore.getItemAsync('id');

        return fetch('https://e2efd4cadad6.ngrok.io/api/change-user-info', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                compId: compId,
                userId: userId,
                token: token,
                newData: this.state.newData,
                changeType: this.state.changeType
            }),
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        success: responseJson.success
                    },
                    function () {
                        if (responseJson.success == true) {
                            alert('Information Updated!');
                            this.props.navigation.navigate('InfoNav');

                        }
                        else {
                            alert('Serve Could Not Be Reached Please Try Again');

                        }
                    }
                );
            })
            .catch(error => {
                console.error(error);
                alert('Serve Could Not Be Reached Please Try Again');
                alert(error);
            });
    }

    render() {

        const changeType: string = this.props.navigation.getParam('changeType', 'none');

        this.state.changeType = changeType;
        var changeTypeDisp = '';

        if (changeType == 'phone') {
            changeTypeDisp = 'Phone Number';
        }
        else if (changeType == 'email') {
            changeTypeDisp = 'Email';
        }
        else if (changeType == 'icc') {
            changeTypeDisp = 'ICC ID';
        }
        else if (changeType == 'state_cert') {
            changeTypeDisp = 'State Cert ID';
        }
        var changeTypeDispPlc = "Enter New " + changeTypeDisp

        return (
            <View style={styles.container}>
                <View style={styles.containerTop}>

                    <View style={styles.logoBox}>
                        <TouchableOpacity onPress={this.goToInfo}>

                            <Image style={styles.tinyLogo} source={require('../assets/icons/back-arrow.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.topBar}>
                        <Text style={styles.textBold}>Change {changeTypeDisp}</Text>
                    </View>


                </View>

                <View style={styles.containerRowQuarter}>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder={changeTypeDispPlc}
                            placeholderTextColor="#969696"
                            onChangeText={text => this.setState({ newData: text })} />
                    </View>
                </View>
                <View style={styles.containerRowHalf}>
                    <TouchableOpacity onPress={this.updateUserInfo} style={styles.changeBtn}>
                        <Text style={styles.textLight}>Change</Text>
                    </TouchableOpacity>
                </View>

            </View>



        );
    }




}

