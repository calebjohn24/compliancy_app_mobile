import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, YellowBox, TouchableOpacity, TextInput, ScrollView, Linking, SectionList, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as SecureStore from 'expo-secure-store';
import styles from '../../styles/systemRegistration/previewSystem'
import FireHoodModal from '../../components/fire-hood/fireHoodInfo'
import LoadingIcon from '../../components/loading'





interface ScreenState {
    'compId': any,
    'systemInfo':any,
    'email': string,
    'name': string,
    'owner':string,
    'phone': string,
    'spinner':boolean
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
            'phone': '',
            'spinner':true
        };

    }

    componentDidMount = async () => {

        try {


            let compId = await SecureStore.getItemAsync('compId');
            let userId = await SecureStore.getItemAsync('id');
            let token = await SecureStore.getItemAsync('token');
            var systemInfoParam:any = this.props.navigation.getParam('systemInfo', {});
            this.setState({compId:compId})


            return fetch('https://compliancy-app.appspot.com/api/system-info', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    compId: compId,
                    userId: userId,
                    token: token,
                    systemId: systemInfoParam[0]['systemId']
                }),
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState(
                        {
                            systemInfo: responseJson.system
                        },
                         () => {
                            this.setState({systemInfo:responseJson.system})
                        }
                    );
                })
                .catch(error => {
                    console.log(error)
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

        var systemInfoParam:any = this.props.navigation.getParam('systemInfo', {});

        var systemInfo:any = this.state.systemInfo;

        
        return (
            <View>
            {this.state.spinner ? <LoadingIcon /> : <>

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

                <ScrollView style={styles.scrollView}>

                <Text style={styles.textBold}>Registration Request Sent To Fire Marshal</Text>
                <Text style={styles.textLight}>Once Your Request Is Approved You Can Perform Inspections On This System</Text>
                <Text style={styles.textBold}>System ID: #{systemInfoParam[0]['systemId']}</Text>
                <View style={styles.container}>
                                {`${systemInfo.type}` == "fire-hood" ?
                                    <FireHoodModal systemInfo={systemInfo} /> : <></>
                                }
                                
                                <Text style={styles.textLightLg}><Image style={styles.ImgMd} source={require('../../assets/icons/company-red.png')} /> {systemInfo.name}</Text>
                                <Text style={styles.textLightSm}><Image style={styles.ImgMd} source={require('../../assets/icons/map-blue.png')} /> {systemInfo.addr} {systemInfo.city} {systemInfo.state}</Text>
                                <Text style={styles.textLightLg}><Image style={styles.ImgMd} source={require('../../assets/icons/red-law.png')} /> {systemInfoParam[1]['zoneId']}</Text>
                                <Text style={styles.textLightLg}><Image style={styles.ImgMd} source={require('../../assets/icons/user-green.png')} /> {systemInfo.owner}</Text>
                                <Text style={styles.textLightSm}><Image style={styles.ImgMd} source={require('../../assets/icons/mail.png')} /> {systemInfo.email}</Text>
                                <Text style={styles.textLightLg}><Image style={styles.ImgMd} source={require('../../assets/icons/phone-red.png')} /> {systemInfo.phone}</Text>
                                <Text style={styles.textLightLg}><Image style={styles.ImgMd} source={require('../../assets/icons/brand-blue.png')} /> {systemInfo.brand}</Text>
                                <Text style={styles.textLightLg}><Image style={styles.ImgMd} source={require('../../assets/icons/calendar-yellow.png')} /> {systemInfo.next_inspect} Days</Text>
                                <Text style={styles.textLightSm}><Image style={styles.ImgMd} source={require('../../assets/icons/calendar-green.png')} /> Registered: {systemInfo.time_stamp}</Text>
                                <TouchableOpacity onPress={() => Linking.openURL(systemInfo.drawing)}>
                                    <Text style={styles.textLightSm}>Diagram/Photo:</Text>
                                </TouchableOpacity>
                                <Image style={styles.maxImg} source={{ uri: systemInfo.drawing }} />

                                
                
                            
                            </View>
                            <View style={styles.containerRow0}> 
                                <TouchableOpacity onPress={this.goToHome}>
                                <Text style={styles.textLightLg}>Done <Image style={styles.ImgLg} source={require('../../assets/icons/check-green.png')} />
                                </Text>
                                </TouchableOpacity>
                                </View>

                </ScrollView>
                </>
            }
                
            </View>


        );

    }
}



