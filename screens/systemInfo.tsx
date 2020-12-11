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
            systemID = this.state.systemId;
            this.state.compId = compId;


            return fetch('https://1ab18b31c7bb.ngrok.io/api/system-info', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    compId: compId,
                    userId: userId,
                    token: token,
                    systemId: systemID
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

    goToEditInfo = (changeType: string) => {
        this.props.navigation.navigate('EditInfoNav', { changeType: changeType });
    }

    render() {

        const systemId: string = this.props.navigation.getParam('system', 'none');
        this.state.systemId = systemId;
        var systemInfo = this.state.systemInfo;
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
                                <Text style={styles.dispNameText}>System #{systemId}</Text>
                            </View>


                        </View>
                        <ScrollView style={styles.scrollView}>
                        <View style={styles.container}>
                        <Text style={styles.textLightLg}><Image style={styles.ImgMd} source={require('../assets/icons/gear-white.png')} /> {systemInfo.type}</Text>
                        { `${systemInfo.active}` == "yes" ?
                        <>
                            <Text style={styles.textLightLg}><Image style={styles.ImgMd} source={require('../assets/icons/power-green.png')} /> Active</Text>
                                
                                <View style={styles.containerRow0}>
                                    <View style={styles.rowButton}>
                                    <TouchableOpacity onPress={() => alert("test")}>
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
                        <Text style={styles.textLightLg}><Image style={styles.ImgMd} source={require('../assets/icons/power-red.png')}/> Inactive</Text>
                        }
                        

                        <Text style={styles.textLightSm}><Image style={styles.ImgSm} source={require('../assets/icons/map-blue.png')} /> {systemInfo.addr} {systemInfo.city} {systemInfo.state}</Text>

                        </View>




                        </ScrollView>
                    </View>
                }
            </View>


        );

    }
}



