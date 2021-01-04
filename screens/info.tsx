import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, YellowBox, TouchableOpacity, TextInput, ScrollView, Linking, SectionList, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as SecureStore from 'expo-secure-store';
import homePanel from './home'
import RootStack from '../App'
import { FlatList } from 'react-native';
import styles from '../styles/info'
import LoadingIcon from '../components/loading'

export default class infoPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'logo': 'https://firebasestorage.googleapis.com/v0/b/compliancy-app.appspot.com/o/Logo_text_no_bg.png?alt=media&token=2982a122-243e-447b-a552-0b1f63e07921',
            'dispName': '',
            'compInfo': {},
            'userInfo': {},
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
            this.state.compId = compId;

            return fetch('https://cd940c5a21e2.ngrok.io/api/user-info', {
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

        const logo = this.state.logo;
        var union = '';
        if (this.state.compInfo.union == 'True') {
            union = 'Union'
        }
        else {
            union = 'Not Union'
        }
        

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
                

                
                <View style={styles.containerRow0}>
                    <View style={styles.buttonSmBox}>
                        <TouchableOpacity onPress={() => this.goToEditInfo('phone')}>

                            <Image style={styles.buttonImgSm} source={require('../assets/icons/phone.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowText}>
                        <Text style={styles.textLight}>{this.state.userInfo.phone}</Text>
                    </View>
                </View>

                <View style={styles.containerRow0}>
                    <View style={styles.buttonSmBox}>
                        <TouchableOpacity onPress={() => this.goToEditInfo('email')}>

                            <Image style={styles.buttonImgSm} source={require('../assets/icons/mail.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowText}>
                        <Text style={styles.textLight}>{this.state.userInfo.email}</Text>
                    </View>
                </View>

                <View style={styles.containerRow0}>
                    <View style={styles.buttonSmBox}>
                        <TouchableOpacity onPress={() => this.goToEditInfo('state_cert')}>

                            <Image style={styles.buttonImgSm} source={require('../assets/icons/certificate.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowText}>
                        <Text style={styles.textLight}>{this.state.userInfo.state_cert}</Text>
                    </View>
                </View>
                <View style={styles.containerRow0}>
                    <View style={styles.buttonSmBox}>
                        <TouchableOpacity onPress={() => this.goToEditInfo('icc')}>

                            <Image style={styles.buttonImgSm} source={require('../assets/icons/id.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowText}>
                        <Text style={styles.textLight}>{this.state.userInfo.icc}</Text>
                    </View>
                </View>

                <View style={styles.containerTop}>
                    <View style={styles.topBar}>
                        <Text style={styles.dispNameText}>Company Info</Text>
                    </View>
                </View>

                <View style={styles.containerRow0}>
                    <View style={styles.buttonSmBox}>


                        <Image style={styles.buttonImgSm} source={require('../assets/icons/map.png')} />

                    </View>
                    <View style={styles.rowText}>
                        <Text style={styles.textLightSm}>{this.state.compInfo.addr} {this.state.compInfo.city} {this.state.compInfo.state} {this.state.compInfo.zip}</Text>
                    </View>
                </View>

                <View style={styles.containerRow0}>
                    <View style={styles.buttonSmBox}>

                        <TouchableOpacity onPress={() => Linking.openURL(`${this.state.compInfo.website}`)}>
                            <Image style={styles.buttonImgSm} source={require('../assets/icons/web.png')} />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.rowText}>
                        <Text style={styles.textLightSm} onPress={() => Linking.openURL(`${this.state.compInfo.website}`)}>{this.state.compInfo.website}</Text>
                    </View>
                </View>
                <View style={styles.containerRow0}>
                    <View style={styles.buttonSmBox}>


                        <Image style={styles.buttonImgSm} source={require('../assets/icons/phone-red.png')} />

                    </View>
                    <View style={styles.rowText}>
                        <Text style={styles.textLight}>{this.state.compInfo.phone}</Text>
                    </View>
                </View>
                <View style={styles.containerRow0}>
                    <View style={styles.buttonSmBox}>
                        <Image style={styles.buttonImgSm} source={require('../assets/icons/licence-red.png')} />
                    </View>
                    <View style={styles.rowText}>
                        <Text style={styles.textLight}>{this.state.compInfo.lic}</Text>
                    </View>
                </View>

                <View style={styles.containerRow0}>
                    <View style={styles.buttonSmBox}>
                        <Image style={styles.buttonImgSm} source={require('../assets/icons/union-red.png')} />
                    </View>
                    <View style={styles.rowText}>
                        <Text style={styles.textLight}>{union}</Text>
                    </View>
                </View>

                <View style={styles.containerRow0}>
                    <View style={styles.buttonSmBox}>
                        <Image style={styles.buttonImgSm} source={require('../assets/icons/company-red.png')} />
                    </View>
                    <View style={styles.rowText}>
                        <Text style={styles.textLight}>{this.state.compInfo.legal_name}</Text>
                    </View>
                </View>

                <View style={styles.containerRow0}>
                    <View style={styles.buttonSmBox}>
                        <Image style={styles.buttonImgSm} source={require('../assets/icons/Logo_no_bg.png')} />
                    </View>
                    <View style={styles.rowText}>
                        <Text style={styles.textLight}>{this.state.compId}</Text>
                    </View>
                </View>
                <View style={styles.containerRow0}>

                </View>
                <View style={styles.containerRow0}>
                    <View style={styles.rowButton}>
                        <TouchableOpacity onPress={this.goToCerts}>
                            <Text style={styles.textBold}>View Certificates</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goToCerts}>
                            <Image style={styles.buttonImgLg} source={require('../assets/icons/cert-green.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.containerRow0}></View>



            </ScrollView>
            </View>
            }
            </View>


        );

    }
}



