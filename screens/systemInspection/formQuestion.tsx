import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, YellowBox } from 'react-native';
import { Camera, getPermissionsAsync } from 'expo-camera';
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
    'tag': string,
    'compId': any,
    'question': any,
    'formComplete': boolean,
    'spinner': boolean,
    'dataProc': boolean,
    'check': string,
    'checkTag': string,
    'mul': string,
    'mulTag': string,
    'text': string,
    'photoTaken': boolean,
    'photoReq':boolean,
    'hasCameraPermission': any,
    'flashMode': any,
    'capturing': any
    'captures': any,
    'photoUri':string,
};

interface ScreenProps {
    navigation: any
}

export default class systemInspectQuestionPanel extends React.Component<ScreenProps, ScreenState>{
    camera!: Camera | null;

    constructor(props: any) {
        super(props);
        this.state = {
            'systemId': '',
            'zoneId': '',
            'formId': '',
            'formIndex': 0,
            'formName': '',
            'reportId': '',
            'tag': '',
            'compId': '',
            'question': [],
            'formComplete': false,
            'spinner': true,
            'dataProc': false,
            'check': '',
            'checkTag': '',
            'mul': '',
            'mulTag': '',
            'text': '',
            'photoTaken': false,
            'photoReq':false,
            'hasCameraPermission': null,
            'flashMode': Camera.Constants.FlashMode.off,
            'capturing': null,
            'captures': [],
            'photoUri':'',
        };

    }


    componentDidMount = async () => {
        YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

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
                    console.log(this.state.tag)
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





    setFlashMode = (flashMode: any) => this.setState({ flashMode });


    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data: any = await this.camera.takePictureAsync(options)
                .then((data: { uri: string; }) => {
                    this.setState({ 
                        flashMode: Camera.Constants.FlashMode.off,
                        photoUri: data.uri,
                        photoTaken: true
                    })

                });
        }
    };



    goToSystemInfo = () => {
        this.props.navigation.navigate('SystemInfoNav', { system: this.state.systemId });
    }


    getCheckBoxResponse(checkResp: string, tag: string) {
        this.setState({
            check: checkResp,
            checkTag: tag,
        });
    }



    render() {

        var flashMode = this.state.flashMode;
        const formName: string = this.props.navigation.getParam('formName', '');

        const formIndex: number = this.props.navigation.getParam('formIndex', '');


        const question: any = this.state.question;

        var codeBool: boolean = false;

        var codeTextBool: boolean = false;

        var fileBool: boolean = false;

        var imgBool: boolean = false;

        var checkBool: boolean = false;
        var photoBool: boolean = false;
        var mulBool: boolean = false;
        var textBool: boolean = false;


        if (question.length != 0) {
            if ('code' in question) {
                codeBool = true;
            }

            if (question.file.data != "none") {
                fileBool = true;
            }

            if (question.img.data != "none") {
                imgBool = true;
            }

            if ('check' in question.type) {
                checkBool = true;
            }

            if ('file' in question.type) {
                photoBool = true;
            }

            if ('mul' in question.type) {
                mulBool = true;
            }

            if ('text' in question.type) {
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
                                <FireCode fireCode={question.code} /> :
                                <></>
                            }

                            {checkBool ?
                                <CheckAns responses={question.type.check} tag={this.state.tag} callback={this.getCheckBoxResponse.bind(this)} /> :
                                <></>
                            }

                            {photoBool ?
                                <View>
                                    {!this.state.photoTaken ?
                                        <View style={styles.container}>
                                            <View style={styles.containerQuestion}>
                                                <Text style={styles.textLightLg}>Upload A Photo</Text>
                                            </View>

                                            {`${this.state.hasCameraPermission}` ?



                                                <Camera
                                                    style={styles.preview}
                                                    ref={ref => {
                                                        this.camera = ref;
                                                    }}
                                                    flashMode={flashMode}
                                                />

                                                :
                                                <Text style={styles.textBold}>Camera Denied Permission</Text>


                                            }
                                            <View style={styles.containerRowQuarter}>
                                                <TouchableOpacity onPress={() => this.setState({ flashMode: Camera.Constants.FlashMode.torch })}><Image style={styles.ImgLg} source={require('../../assets/icons/flash-on-white.png')} /></TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.takePicture()}><Image style={styles.ImgLg} source={require('../../assets/icons/camera-green.png')} /></TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setState({ flashMode: Camera.Constants.FlashMode.off })}  ><Image style={styles.ImgLg} source={require('../../assets/icons/flash-off-white.png')} /></TouchableOpacity>
                                            </View>



                                        </View>
                                        :
                                        <View style={styles.container}>
                                            <View style={styles.containerQuestion}>
                                                <Text style={styles.textLightLg}>Use This Photo</Text>
                                            </View>
                        

                                        <Image style={styles.ImgPreview} source={{ uri: this.state.photoUri }} />

                                        <View style={styles.containerRowQuarter}>
                                        <TouchableOpacity onPress={() => this.setState({photoTaken:false})}  ><Image style={styles.ImgLg} source={require('../../assets/icons/red-retry.png')}/></TouchableOpacity>
                                        <TouchableOpacity onPress={() => alert('done')}  ><Image style={styles.ImgLg} source={require('../../assets/icons/check-noFill-green.png')}/></TouchableOpacity>
                                        </View>
                                            

                                        </View>

                                    }
                                </View> :
                                <></>

                            }



                        </ScrollView>





                    </View>







                }
            </View>
        );
    }

}



