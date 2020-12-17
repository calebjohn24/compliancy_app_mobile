import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, YellowBox, TouchableOpacity, TextInput, ScrollView, Linking, SectionList, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as SecureStore from 'expo-secure-store';
import homePanel from './home'
import RootStack from '../App'
import { FlatList } from 'react-native';
import styles from '../styles/systemInfo'
import LoadingIcon from '../components/loading'
import FireHoodModal from '../components/fireHoodInfo'

export default class systemInfoPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'systemInfo': {},
            'systemId': '',
            'spinner': true
        };

    }


    componentDidMount = async () => {

        try {


            let compId = await SecureStore.getItemAsync('compId');
            let userId = await SecureStore.getItemAsync('id');
            let token = await SecureStore.getItemAsync('token');
            const systemId: string = this.props.navigation.getParam('system', 'none');
            this.state.compId = compId;


            return fetch('https://1dc7cb34e362.ngrok.io/api/system-info', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    compId: compId,
                    userId: userId,
                    token: token,
                    systemId: systemId
                }),
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState(
                        {
                            systemInfo: responseJson.system
                        },
                        function () {
                            this.state.systemInfo = responseJson.system
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

    goToViewSystems = () => {
        this.props.navigation.navigate('viewSystemPanelsNav');
    }

    goToFindReports = (systemId: string) => {
        this.props.navigation.navigate('viewReportsNav', { systemId: systemId });
    }

    render() {

        const systemId: string = this.props.navigation.getParam('system', '');
        this.state.systemId = systemId;
        var systemInfo = this.state.systemInfo;
        var tag;
        if (systemInfo.tag == "Red") {
            tag = <Text style={styles.textLightLg}><Image style={styles.ImgLg} source={require('../assets/icons/tag-red.png')} /> Red</Text>
        }
        else if (systemInfo.tag == "Yellow") {
            tag = <Text style={styles.textLightLg}><Image style={styles.ImgLg} source={require('../assets/icons/tag-yellow.png')} /> Yellow</Text>
        } else if (systemInfo.tag == "White") {
            tag = <Text style={styles.textLightLg}><Image style={styles.ImgLg} source={require('../assets/icons/tag-white.png')} /> White</Text>
        }
        return (
            <View>
                {this.state.spinner ? <LoadingIcon /> :
                    <View>
                        <View style={styles.containerTop}>

                            <View style={styles.logoBox}>
                                <TouchableOpacity onPress={this.goToViewSystems}>

                                    <Image style={styles.tinyLogo} source={require('../assets/icons/back-arrow.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.topBar}>
                                <Text style={styles.dispNameText}>System #{this.state.systemId}</Text>
                            </View>


                        </View>
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.container}>
                                {`${systemInfo.type}` == "fire-hood" ?
                                    <FireHoodModal systemInfo={systemInfo} /> : <></>
                                }
                                {`${systemInfo.active}` == "yes" ?
                                    <>
                                        <Text style={styles.textLightLg}><Image style={styles.ImgLg} source={require('../assets/icons/power-green.png')} /> Active</Text>

                                        <View style={styles.containerRow0}>
                                            <View style={styles.rowButton}>
                                                <TouchableOpacity onPress={() => this.goToFindReports(systemId)}>
                                                    <Image style={styles.buttonImgLg} source={require('../assets/icons/report-search.png')} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => alert("test")}>
                                                    <Text style={styles.buttonText}>Find Report</Text>
                                                </TouchableOpacity>

                                            </View>
                                            <View style={styles.rowButton1}>

                                                <TouchableOpacity onPress={() => alert('test')}>
                                                    <Image style={styles.buttonImgLg} source={require('../assets/icons/report-add.png')} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => alert('test')}>
                                                    <Text style={styles.buttonText}>New Report</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </>

                                    :
                                    <Text style={styles.textLightLg}><Image style={styles.ImgLg} source={require('../assets/icons/power-red.png')} /> Inactive</Text>
                                }
                                {tag}
                                <Text style={styles.textLightLg}><Image style={styles.ImgMd} source={require('../assets/icons/company-red.png')} /> {systemInfo.name}</Text>
                                <Text style={styles.textLightSm}><Image style={styles.ImgMd} source={require('../assets/icons/map-blue.png')} /> {systemInfo.addr} {systemInfo.city} {systemInfo.state}</Text>
                                <Text style={styles.textLightLg}><Image style={styles.ImgMd} source={require('../assets/icons/red-law.png')} /> {systemInfo.zone}</Text>
                                <Text style={styles.textLightLg}><Image style={styles.ImgMd} source={require('../assets/icons/user-green.png')} /> {systemInfo.owner}</Text>
                                <Text style={styles.textLightSm}><Image style={styles.ImgMd} source={require('../assets/icons/mail.png')} /> {systemInfo.email}</Text>
                                <Text style={styles.textLightLg}><Image style={styles.ImgMd} source={require('../assets/icons/phone-red.png')} /> {systemInfo.phone}</Text>
                                <Text style={styles.textLightLg}><Image style={styles.ImgMd} source={require('../assets/icons/brand-comp-yellow.png')} /> {systemInfo.brand}</Text>
                                <Text style={styles.textLightSm}><Image style={styles.ImgMd} source={require('../assets/icons/calendar-green.png')} /> Registered: {systemInfo.time_stamp}</Text>
                                <Text style={styles.textLightSm}><Image style={styles.ImgMd} source={require('../assets/icons/calendar-red.png')} /> Inspected: {systemInfo.last_inspect}</Text>
                                <TouchableOpacity onPress={() => Linking.openURL(systemInfo.drawing)}>
                                    <Text style={styles.textLightSm}>Model: {systemInfo.model}</Text>
                                </TouchableOpacity>
                                <Image style={styles.maxImg} source={{ uri: systemInfo.drawing }} />

                            </View>



                        </ScrollView>
                    </View>
                }
            </View>


        );

    }
}



