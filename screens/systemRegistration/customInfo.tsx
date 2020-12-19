import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homePanel from '.././home'
import RootStack from '../../App'
import styles from '../../styles/systemRegistration/customInfo'
import FireHoodQuestions from '../../components/fire-hood/fireHoodQuestions'
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
    'lat': number,
    'spinner': boolean
};

interface ScreenProps {
    navigation: any
}


export default class systemRegCustomInfoPanel extends React.Component<ScreenProps, ScreenState>{


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
            'lat': 0.0,
            'spinner': true
        };

    }







    goToHome = () => {
        this.props.navigation.navigate('HomeNav');
    }

    goToCustomInfo = (systemId: string, zoneId: string, brand: string, streetAddr: string, city: string, state: string, zipCode: string, lat: number, long: number) => {
        this.props.navigation.navigate('systemRegCustomInfoPanelNav', {
            systemId: systemId,
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

        const systemId: string = this.props.navigation.getParam('systemId', '');
        const zoneId: string = this.props.navigation.getParam('zoneId', '');
        const systemType: string = this.props.navigation.getParam('systemType', '');
        const brand: string = this.props.navigation.getParam('brand', '');
        const streetAddr: string = this.props.navigation.getParam('streetAddr', '');
        const city: string = this.props.navigation.getParam('city', '');
        const state: string = this.props.navigation.getParam('state', '');
        const zipCode: string = this.props.navigation.getParam('zipCode', '');
        const lat: number = this.props.navigation.getParam('lat', '');
        const long: number = this.props.navigation.getParam('long', '');

        const systemInfo: any = [
            {'systemId':systemId},
            {'zoneId':zoneId},
            {'systemType':systemType},
            {'brand':brand},
            {'streetAddr':streetAddr},
            {'city':city},
            {'state':state},
            {'zipCode':zipCode},
            {'lat':lat},
            {'long':long}
        ];



        const questionComponents = [{'id':'fire-hood','element':<FireHoodQuestions systemInfo={systemInfo} navigation={this.props.navigation} />}];
        
        var renderComponent: JSX.Element = <></>;
        for (var key in questionComponents) {
            
            
            if(questionComponents[key]['id'] == systemType){
                renderComponent = questionComponents[key]['element']
            }

        }

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
                            <Text style={styles.dispNameText}>Enter System Info</Text>
                        </View>
                    </View>
                    {renderComponent}
                </View>











            </View>






        );

    }



}