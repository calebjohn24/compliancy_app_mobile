import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homePanel from '.././home'
import RootStack from '../../App'
import styles from '../../styles/systemRegistration/start'
import LoadingIcon from '../../components/loading'


interface ScreenState {
    'systemId': any,
    'zones': any,
    'compId': any,
    'spinner':boolean
};

interface ScreenProps {
    navigation: any
}

export default class infoPanel extends React.Component <ScreenProps, ScreenState>{

    constructor(props:any) {
        super(props);
        this.state = {
            'systemId': '',
            'zones': {},
            'compId': '',
            'spinner':true
        };

    }


    componentDidMount = async () => {

        try {


            let compId = await SecureStore.getItemAsync('compId');
            let userId = await SecureStore.getItemAsync('id');
            let token = await SecureStore.getItemAsync('token');
            //var token = SecureStore.getItemAsync('token');
            
            this.setState({ compId: compId })

            return fetch('https://1dc7cb34e362.ngrok.io/api/reg_system/start', {
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
                            systemId: responseJson.systemId,
                            zones: responseJson.zones
                        }
                    );
                })
                .catch(error => {
                    alert("Cannot Reach Server")
                })
                .finally(() => {
                    this.setState({ spinner: false });
                  });




        } catch (error) {
            console.log(error)
            alert("Cannot Reach Server")
        }
    }

    goToHome = () => {
        this.props.navigation.navigate('HomeNav');
    }

    goToCerts = () => {
        this.props.navigation.navigate('CertificateNav');
    }

    goToEditInfo = (changeType: string) => {
        this.props.navigation.navigate('EditInfoNav', {changeType: changeType});
      }

    render() {

        

        return (
            <View> 
            {this.state.spinner ? <LoadingIcon/>:
            <View> 
                <View style={styles.containerTop}>

            <View style={styles.logoBox}>
                <TouchableOpacity onPress={this.goToHome}>

                    <Image style={styles.tinyLogo} source={require('../assets/icons/back-arrow.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.topBar}>
                <Text style={styles.dispNameText}>Your Info</Text>
            </View>


            </View>
            <ScrollView style={styles.scrollView}>



            </ScrollView>
            </View>
            }
            </View>


        );

    }
}



