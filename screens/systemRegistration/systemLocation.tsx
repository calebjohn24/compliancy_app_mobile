import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homePanel from '.././home'
import RootStack from '../../App'
import styles from '../../styles/systemRegistration/systemLocation'
import LoadingIcon from '../../components/loading'
import { SearchBar } from 'react-native-elements';


interface ScreenState {
    'systemId': string,
    'zoneId': string,
    'systemType': string,
    'brands': any,
    'certReq': any,
    'brandsProc': any
    'brandsAll': any,
    'compId': any,
    'spinner': boolean,
    'search': string,
    'dataProc': boolean
};

interface ScreenProps {
    navigation: any
}


export default class systemRegLocationPanel extends React.Component<ScreenProps, ScreenState>{


    constructor(props: any) {
        super(props);
        this.state = {
            'systemId': '',
            'zoneId': '',
            'systemType': '',
            'brands': {},
            'certReq': 'yes',
            'brandsProc': {},
            'brandsAll': {},
            'compId': '',
            'spinner': true,
            'search': '',
            'dataProc': false
        };

    }


    uploadLocationInfo = async () => {

        try {

            const systemId: string = this.props.navigation.getParam('systemId', '');
            const zoneId: string = this.props.navigation.getParam('zoneId', '');
            const systemType: string = this.props.navigation.getParam('systemType', '');

            this.setState({
                systemId: systemId,
                zoneId: zoneId
            })
            let compId = await SecureStore.getItemAsync('compId');
            let userId = await SecureStore.getItemAsync('id');
            let token = await SecureStore.getItemAsync('token');
            //var token = SecureStore.getItemAsync('token');


            this.setState({ compId: compId })

            return fetch('https://d1c62bb6557a.ngrok.io/api/reg_system/brand', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    compId: compId,
                    userId: userId,
                    token: token,
                    systemId: systemId,
                    systemType: systemType,
                    zoneId: zoneId,
                }),
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState(
                        {
                            brands: responseJson.certs,
                            certReq: responseJson.cert_req
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



    render() {

        return (


            <View>

                {this.state.spinner ? <LoadingIcon /> :
                    <View>

                        <View style={styles.containerTop}>

                            <View style={styles.logoBox}>
                                <TouchableOpacity onPress={this.goToHome}>

                                    <Image style={styles.tinyLogo} source={require('../../assets/icons/cancel-red.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.topBar}>
                                <Text style={styles.dispNameText}>System Address</Text>
                            </View>
                        </View>

                        




                    </View>







                }



            </View>






        );

    }



}