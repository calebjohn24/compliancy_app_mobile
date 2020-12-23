import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import RootStack from '../../App'
import styles from '../../styles/systemInspection/selectForm'
import LoadingIcon from '../../components/loading'



interface ScreenState {
    'systemId': string,
    'zoneId': string,
    'formId': string,
    'formIndex':number,
    'formName':string,
    'compId': any,
    'spinner': boolean,
    'dataProc': boolean
};

interface ScreenProps {
    navigation: any
}

export default class systemInspectQuestionPanel extends React.Component<ScreenProps, ScreenState>{

    constructor(props: any) {
        super(props);
        this.state = {
            'systemId': '',
            'zoneId': '',
            'formId':'',
            'formIndex':0,
            'formName':'',
            'compId': '',
            'spinner': true,
            'dataProc': false
        };

    }


    componentDidMount = async () => {

        try {

            const systemId: string = this.props.navigation.getParam('systemId', '');
            const zoneId: string = this.props.navigation.getParam('zoneId', '');
            const formId: string = this.props.navigation.getParam('formId', '');
            const formIndex: number = this.props.navigation.getParam('formIndex', '');

            this.setState({
                systemId: systemId,
                zoneId: zoneId,
                formId: formId,
                formIndex:formIndex
            })

            console.log(zoneId)


            let compId = await SecureStore.getItemAsync('compId');
            let userId = await SecureStore.getItemAsync('id');
            let token = await SecureStore.getItemAsync('token');
            //var token = SecureStore.getItemAsync('token');



            this.setState({ compId: compId })

            return fetch('https://e2efd4cadad6.ngrok.io/api/system_inspect/inspect', {
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
                    zoneId: zoneId,
                }),
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState(
                        {
                            forms: responseJson.forms,
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



    
    




    goToSystemInfo = () => {
        this.props.navigation.navigate('SystemInfoNav', {system: this.state.systemId});
      }






    render() {

        const reportName = '';



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
                                <Text style={styles.dispNameText}>{reportName}</Text>
                            </View>
                        </View>
                        <ScrollView style={styles.scrollView}>



                        </ScrollView>

                        



                    </View>







                }
            </View>
        );
    }

}



