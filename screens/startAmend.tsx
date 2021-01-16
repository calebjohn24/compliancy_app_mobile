import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homePanel from './home'
import RootStack from '../App'
import styles from '../styles/startAmend'
import LoadingIcon from '../components/loading'
import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


interface ScreenState {
    'spinner':boolean

};

interface ScreenProps {
    navigation: any
}


export default class startAmendPanel extends React.Component<ScreenProps, ScreenState>{

    constructor(props: any) {
        super(props);
        this.state = {
            'spinner':false
        };


    }

    goBack = () => {
        this.props.navigation.navigate('viewAmendsPanelNav')
    }

    startAmend = async (item: any) =>{
        const amendCode = item.id;

        this.setState({spinner:true})

        try {


            let compId = await SecureStore.getItemAsync('compId');
            let userId = await SecureStore.getItemAsync('id');
            let token = await SecureStore.getItemAsync('token');
            //var token = SecureStore.getItemAsync('token');


            return fetch('https://365a6631f36d.ngrok.io/api/system_inspect/start_amend', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    compId: compId,
                    userId: userId,
                    token: token,
                    amendCode: amendCode
                }),
            })
                .then(response => response.json())
                .then(responseJson => {
                    if(responseJson.success){
                        this.props.navigation.navigate('systemInspectQuestionPanelNav', {
                            systemId: item.data.system,
                            zoneId: item.data.zone,
                            formId: item.data.form_id,
                            formName: item.data.form_name,
                            reportId: item.data.report,
                            formIndex:0
                        });
                    }
                    else{
                        alert("Cannot Reach Server")
                    }
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


    render() {
        const item = this.props.navigation.getParam('item', {});
        //console.log(JSON.stringify(item))
        return (
            <View>
                {this.state.spinner ? <LoadingIcon /> :
                <>

                <View style={styles.containerTop}>

                    <View style={styles.logoBox}>
                        <TouchableOpacity onPress={this.goBack}>
                            <Image style={styles.tinyLogo} source={require('../assets/icons/back-arrow.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.topBar}>
                        <Text style={styles.dispNameText}>Request #{item.id}</Text>
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.textLightLg}><Image style={styles.ImgLg} source={require('../assets/icons/calendar-red.png')} /> Filed: {item.data.time_stamp}</Text>
                    <Text style={styles.textLightLg}><Image style={styles.ImgLg} source={require('../assets/icons/form-green.png')} /> Form: {item.data.form_name}</Text>
                    <Text style={styles.textLightLg}><Image style={styles.ImgLg} source={require('../assets/icons/red-law.png')} /> Jurisdiction: {item.data.zone}</Text>
                    <Text style={styles.textLightLg}><Image style={styles.ImgLg} source={require('../assets/icons/gear-white.png')} /> System: #{item.data.system}</Text>
                    <Text style={styles.textLightLg}>
                    <Image style={styles.ImgLg} source={require('../assets/icons/question-blue.png')} /> Requested Changes:
                    </Text>
                    <Text style={styles.textLight}>{item.data.reason}</Text>
                    
                    <View style={styles.containerBottom}>
                            <Text style={styles.textLightLg}>Make Changes?</Text>
                            <Text style={styles.textLightSm}>Note: Once you start amending a report you must finish it. Failure to do so will require filing a new report</Text>

                            <TouchableOpacity style={styles.greenButton} onPress={() => this.startAmend(item)}>
                                <Text style={styles.textBold}>Start <Image style={styles.ImgSm} source={require('../assets/icons/check-green.png')} /></Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.redButton} onPress={() => this.goBack()}>
                                <Text style={styles.textBold}>Go Back <Image style={styles.ImgSm} source={require('../assets/icons/cancel-red.png')} /></Text>
                            </TouchableOpacity>
                        </View>
                </ScrollView>
                </>
    }
            </View>
        );
    }


}