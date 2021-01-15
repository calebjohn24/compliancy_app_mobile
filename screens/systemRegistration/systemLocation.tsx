import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
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
    'brand': any,
    'compId': any,
    'streetAddr': string,
    'city': string,
    'state': string,
    'zipCode': string,
    'success': boolean,
    'long': number,
    'lat': number
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
            'brand': '',
            'compId': '',
            'streetAddr': '',
            'city': '',
            'state': '',
            'zipCode': '',
            'success': false,
            'long': 0.0,
            'lat': 0.0
        };

    }



    uploadLocationInfo = async () => {

        try {

            const systemId: string = this.props.navigation.getParam('systemId', '');
            const zoneId: string = this.props.navigation.getParam('zoneId', '');
            const systemType: string = this.props.navigation.getParam('systemType', '');
            const brand: string = this.props.navigation.getParam('brand', '')

            this.setState({
                systemId: systemId,
                zoneId: zoneId,
                systemType: systemType,
                brand: brand
            })
            
            let compId = await SecureStore.getItemAsync('compId');
            let userId = await SecureStore.getItemAsync('id');
            let token = await SecureStore.getItemAsync('token');



            this.setState({ compId: compId })


            const streetAddr = this.state.streetAddr;
            const city = this.state.city;
            const state = this.state.state;
            const zipCode = this.state.zipCode;

            return fetch('https://365a6631f36d.ngrok.io/api/reg_system/location_info', {
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
                    brand: brand,
                    streetAddr: streetAddr,
                    city: city,
                    state: state,
                    zipCode: zipCode
                }),
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState(
                        {
                            success: responseJson.success,
                            lat: responseJson.lat,
                            long: responseJson.long
                        }
                    );
                })
                .catch(error => {
                    console.log(error)
                    alert("Cannot Reach Server")
                })
                .finally(() => {
                    if (!this.state.success) {
                        alert("Invalid Address Please Try Again");
                    }
                    else {
                        this.goToCustomInfo(systemId, zoneId, systemType, brand, streetAddr, city, state, zipCode, this.state.lat, this.state.long)
                    }
                });




        } catch (error) {
            console.log(error)
            alert("Cannot Reach Server")
        }
    }


    goToHome = () => {
        this.props.navigation.navigate('HomeNav');
    }

    goToCustomInfo = (systemId: string, zoneId: string, systemType:string, brand: string, streetAddr: string, city: string, state: string, zipCode: string, lat: number, long: number) => {
        this.props.navigation.navigate('systemRegCustomInfoPanelNav', {
            systemId: systemId,
            systemType:systemType,
            zoneId: zoneId,
            brand: brand,
            streetAddr: streetAddr,
            city: city,
            state: state,
            zipCode: zipCode,
            lat: lat,
            long: long
        });
    }



    render() {

        return (


            <View>


                <View>

                    <View style={styles.containerTop}>

                        <View style={styles.logoBox}>
                            <TouchableOpacity onPress={this.goToHome}>

                                <Image style={styles.tinyLogo} source={require('../../assets/icons/cancel-red.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topBar}>
                            <Text style={styles.dispNameText}>Enter System Address</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <ScrollView style={styles.scrollView}>

                            <View style={styles.containerRowQuarter}>
                                <Text style={styles.textLight}>Street</Text>
                            </View>
                            <View style={styles.containerRowQuarter}>
                                <View style={styles.inputView}>
                                    <TextInput style={styles.inputText}
                                        dataDetectorTypes="address"
                                        placeholder="Street Address..."
                                        autoCapitalize="words"
                                        placeholderTextColor="#969696"
                                        onChangeText={text => this.setState({ streetAddr: text })}
                                    />
                                </View>
                            </View>
                            <View style={styles.containerRowQuarter}>
                                <Text style={styles.textLight}>City</Text>
                            </View>
                            <View style={styles.containerRowQuarter}>
                                <View style={styles.inputView}>
                                    <TextInput style={styles.inputText}
                                        placeholder="City..."
                                        autoCapitalize="words"
                                        placeholderTextColor="#969696"
                                        onChangeText={text => this.setState({ city: text })}
                                    />
                                </View>
                            </View>
                            <View style={styles.containerRowQuarter}>
                                <Text style={styles.textLight}>State</Text>
                            </View>
                            <View style={styles.containerRowQuarter}>
                                <View style={styles.inputView}>
                                    <TextInput style={styles.inputText}
                                        placeholder="State 2 Char. Abbreviation.."
                                        placeholderTextColor="#969696"
                                        maxLength={2}
                                        autoCapitalize="characters"
                                        onChangeText={text => this.setState({ state: text.toUpperCase() })}
                                        value={this.state.state.toUpperCase()}



                                    />
                                </View>
                            </View>
                            <View style={styles.containerRowQuarter}>
                                <Text style={styles.textLight}>Zip Code</Text>
                            </View>
                            <View style={styles.containerRowQuarter}>
                                <View style={styles.inputView}>
                                    <TextInput style={styles.inputText}
                                        placeholder="Zip Code..."
                                        placeholderTextColor="#969696"
                                        keyboardType="numeric"
                                        maxLength={5}
                                        onChangeText={text => this.setState({ zipCode: text })}
                                    />
                                </View>
                            </View>

                            <View style={styles.containerRowBtn}>
                                <TouchableOpacity onPress={() => this.uploadLocationInfo()} style={styles.changeBtn}>
                                    <Text style={styles.textLight}>Next <Image style={styles.ImgMd} source={require('../../assets/icons/inline-nextarrow-white.png')} /></Text>
                                </TouchableOpacity>
                            </View>





                        </ScrollView>
                    </View>
                </View>











            </View>






        );

    }



}