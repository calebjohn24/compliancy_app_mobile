import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, YellowBox} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import RootStack from '../../App'
import styles from '../../styles/systemInspection/formQuestion'
import LoadingIcon from '../../components/loading'
import FireCode from "../../components/questionComponents/fireCode";
import CheckAns from "../../components/questionComponents/checkbox"




interface ScreenState {
    'systemId': string,
    'zoneId': string,
    'formId': string,
    'formIndex': number,
    'formName': string,
    'reportId': string,
    'tag':string,
    'compId': any,
    'question': any,
    'formComplete': boolean,
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
            'formId': '',
            'formIndex': 0,
            'formName': '',
            'reportId': '',
            'tag':'',
            'compId': '',
            'question': [],
            'formComplete': false,
            'spinner': true,
            'dataProc': false
        };

    }


    componentDidMount = async () => {
        //YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

        try {

            const systemId: string = this.props.navigation.getParam('systemId', '');
            const zoneId: string = this.props.navigation.getParam('zoneId', '');
            const formId: string = this.props.navigation.getParam('formId', '');
            const formIndex: number = this.props.navigation.getParam('formIndex', '');
            const reportId: string = this.props.navigation.getParam('reportId', '');


            this.setState({
                systemId: systemId,
                zoneId: zoneId,
                formId: formId,
                formIndex: formIndex,
                reportId: reportId
            })



            let compId = await SecureStore.getItemAsync('compId');
            let userId = await SecureStore.getItemAsync('id');
            let token = await SecureStore.getItemAsync('token');
            //var token = SecureStore.getItemAsync('token');



            this.setState({ compId: compId })

            return fetch('https://2af1f7fddb40.ngrok.io/api/system_inspect/inspect', {
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
                    reportId: reportId,
                    formId: formId,
                    formIndex: formIndex
                }),
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState(
                        {
                            question: responseJson.question,
                            formComplete: responseJson.formComplete,
                            tag: responseJson.tag
                        }
                    );
                    if (this.state.formComplete) {
                        alert('Form Complete');
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









    goToSystemInfo = () => {
        this.props.navigation.navigate('SystemInfoNav', { system: this.state.systemId });
    }






    render() {


        const formName: string = this.props.navigation.getParam('formName', '');

        const formIndex: number = this.props.navigation.getParam('formIndex', '');


        const question: any = this.state.question;

        var codeBool: boolean = false;

        var codeTextBool: boolean = false;

        var fileBool: boolean = false;

        var imgBool: boolean = false;

        var checkBool:boolean = false;
        var photoBool:boolean = false;
        var mulBool:boolean = false;
        var textBool:boolean = false;
       

        if (question.length != 0) {
            if ('code' in question) {
                codeBool = true;
            }
            
            if(question.file.data != "none"){
                fileBool = true;
            }

            if(question.img.data != "none"){
                imgBool = true;
            }

            if ('check' in question.type){
                checkBool = true;
            }

            if('file' in question.type){
                photoBool = true;
            }

            if('mul' in question.type){
                mulBool = true;
            }

            if('text' in question.type){
                textBool = true;
            }

        }



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
                                <Text style={styles.dispNameText}>Question #{formIndex + 1}</Text>
                            </View>
                        </View>
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.containerQuestion}>
                                <Text style={styles.textBold}>{question.question}</Text>
                            </View>
                            {codeBool ?
                                <FireCode fireCode={question.code} />:
                                <></>
                            }

                            {checkBool ?
                            <CheckAns responses={question.type.check} />:
                                <></>
                            }
                    
                            

                        </ScrollView>





                    </View>







                }
            </View>
        );
    }

}



