import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity, Image } from 'react-native';
import LoadingIcon from '../../components/loading';
import styles from '../../styles/systemInspection/submitForm'


interface ScreenState {
    'reportId': string,
    'systemId': string,
    'formId': string,
    'formName': string,
    'zoneId': string,
    'compId': unknown,
    'success': boolean,
    'spinner': boolean,
}

interface ScreenProps {
    navigation: any
}

export default class systemInspectSubmitFormPanel extends React.Component<ScreenProps, ScreenState> {

    constructor(props: any) {
        super(props);
        this.state = {
            'reportId': '',
            'systemId': '',
            'formId': '',
            'formName': '',
            'zoneId': '',
            'compId': '',
            'success': false,
            'spinner': false,
        };
    }


    componentDidMount = async () => {

        const systemId: string = this.props.navigation.getParam('systemId', '');
        const zoneId: string = this.props.navigation.getParam('zoneId', '');
        const formId: string = this.props.navigation.getParam('formId', '');
        const reportId: string = this.props.navigation.getParam('reportId', '');
        const formName: string = this.props.navigation.getParam('formName', '');
        let compId = await SecureStore.getItemAsync('compId');

        this.setState({
            systemId: systemId,
            zoneId: zoneId,
            formId: formId,
            reportId: reportId,
            formName: formName,
            compId: compId
        });

    }


    submitForm = async () => {

        this.setState({ spinner: true })

        let userId = await SecureStore.getItemAsync('id');
        let token = await SecureStore.getItemAsync('token');

        return fetch('https://365a6631f36d.ngrok.io/api/system_inspect/submit', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                compId: this.state.compId,
                userId: userId,
                token: token,
                systemId: this.state.systemId,
                zoneId: this.state.zoneId,
                reportId: this.state.reportId,
                formId: this.state.formId,
            }),
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.success) {
                    Alert.alert('Form Submitted!');
                    this.props.navigation.navigate('SystemInfoNav', { system: this.state.systemId });
                }
                else {
                    Alert.alert("Server Error");
                }

            })
            .catch(error => {
                Alert.alert("Cannot Reach Server")
            })
            .finally(() => {
                this.setState({ spinner: false });
            });
    }


    goToSystemInfo = async () => {
        this.setState({ spinner: true })

        let userId = await SecureStore.getItemAsync('id');
        let token = await SecureStore.getItemAsync('token');


        return fetch('https://365a6631f36d.ngrok.io/api/system_inspect/delete_report', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                compId: this.state.compId,
                userId: userId,
                token: token,
                reportId: this.state.reportId,
            }),
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.success) {
                    Alert.alert('Report Discarded')
                    this.props.navigation.navigate('SystemInfoNav', { system: this.state.systemId });
                }
                else{
                    alert("Cannot Reach Server Please Try Again");
                    this.props.navigation.navigate('SystemInfoNav', { system: this.state.systemId });
                }
            })
            .catch(error => {
                this.props.navigation.navigate('SystemInfoNav', { system: this.state.systemId });
            })

    }


    submitReport = async () => {
        this.setState({ spinner: true })

        let userId = await SecureStore.getItemAsync('id');
        let token = await SecureStore.getItemAsync('token');


        return fetch('https://365a6631f36d.ngrok.io/api/system_inspect/submit_report', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                compId: this.state.compId,
                userId: userId,
                token: token,
                reportId: this.state.reportId,
                formName: this.state.formName,
                formId: this.state.formId,
                systemId: this.state.systemId,
                zoneId: this.state.zoneId
            }),
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.success) {
                    Alert.alert('Report Submitted To Fire Marshal!')
                    this.props.navigation.navigate('HomeNav');
                }
                else{
                    Alert.alert('Report Submission Failed Please Try Again')
                }
            })
            .catch(error => {
                Alert.alert('Report Submission Failed Please Try Again')
            })

    }





    render() {
        return (
            <View>
                {this.state.spinner ? <LoadingIcon /> :

                    <View>


                        <View style={styles.containerTop}>

                            <View style={styles.logoBox}>
                                <TouchableOpacity onPress={() => this.goToSystemInfo()}>

                                    <Image style={styles.tinyLogo} source={require('../../assets/icons/cancel-red.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.topBar}>
                                <Text style={styles.dispNameText}>Submit Report</Text>
                            </View>
                        </View>

                        <View style={styles.container}>
                            <Text style={styles.textLightLg}>Submit <Text style={styles.textBold}>{this.state.formName}</Text> to <Text style={styles.textBold}>{this.state.zoneId}</Text> Fire Marshal?</Text>

                            <TouchableOpacity style={styles.greenButton} onPress={() => this.submitReport()}>
                                <Text style={styles.textBold}>Submit <Image style={styles.ImgLg} source={require('../../assets/icons/check-green.png')} /></Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.redButton} onPress={() => this.goToSystemInfo()}>
                                <Text style={styles.textBold}>Discard <Image style={styles.ImgLg} source={require('../../assets/icons/cancel-red.png')} /></Text>
                            </TouchableOpacity>
                        </View>



                    </View>
                }
            </View>
        );
    }
}



