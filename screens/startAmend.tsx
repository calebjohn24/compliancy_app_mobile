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

};

interface ScreenProps {
    navigation: any
}


export default class startAmendPanel extends React.Component<ScreenProps, ScreenState>{

    constructor(props: any) {
        super(props);
        this.state = {
        };


    }

    goBack = () => {
        this.props.navigation.navigate('viewAmendsPanelNav')
    }

    startAmend = (item: any) =>{
        this.props.navigation.navigate('systemInspectQuestionPanelNav', {
            systemId: item.data.system,
            zoneId: item.data.zone,
            formId: item.data.form_id,
            formName: item.data.form_name,
            reportId: item.data.report,
            formIndex:0
        });
    }


    render() {
        const item = this.props.navigation.getParam('item', {});
        //console.log(JSON.stringify(item))
        return (
            <View>
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

                            <TouchableOpacity style={styles.greenButton} onPress={() => this.startAmend(item)}>
                                <Text style={styles.textBold}>Yes <Image style={styles.ImgSm} source={require('../assets/icons/check-green.png')} /></Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.redButton} onPress={() => this.goBack()}>
                                <Text style={styles.textBold}>No <Image style={styles.ImgSm} source={require('../assets/icons/cancel-red.png')} /></Text>
                            </TouchableOpacity>
                        </View>
                </ScrollView>
            </View>
        );
    }


}