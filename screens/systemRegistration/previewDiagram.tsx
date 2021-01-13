import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homePanel from '.././home'
import RootStack from '../../App'
import styles from '../../styles/systemRegistration/previewDiagram'
import LoadingIcon from '../../components/loading'
import { SearchBar } from 'react-native-elements';
import { Camera, getPermissionsAsync} from 'expo-camera';


interface ScreenState {
    'compId': any,
    'systemInfo':any,
    'hasCameraPermission': any,
    'flashMode':any,
    'capturing': any
    'captures': any,
    'success':boolean,
    'spinner':boolean
};

interface ScreenProps {
    navigation: any
}


export default class systemRegDiagramPreviewPanel extends React.Component<ScreenProps, ScreenState>{
    camera!: Camera | null;


    constructor(props: any) {
        super(props);


        this.state = {
            'compId': '',
            'systemInfo':{},
            'hasCameraPermission': null,
            'flashMode': Camera.Constants.FlashMode.auto,
            'capturing': null,
            'captures': [],
            'success':false,
            'spinner':false
        };

    }

    componentDidMount() {
        var systemInfo:any = this.props.navigation.getParam('systemInfo', {});
        this.setState({systemInfo:systemInfo});

        
    };


    goToHome = () => {
        this.props.navigation.navigate('HomeNav');
    }

    setFlashMode = (flashMode:any) => this.setState({ flashMode });




    retryPhoto = () => {
        var systemInfo:any = this.props.navigation.getParam('systemInfo', {});
        this.props.navigation.navigate('systemRegDiagramUploadPanelNav', {
            systemInfo:systemInfo
        });
    }

    goToRegConfirm = async (localUri:any) => {
        this.setState({spinner:true})

        var systemInfo:any = this.props.navigation.getParam('systemInfo', {});


        var data:any = new FormData();
        data.append('photo', { uri: localUri, name: 'photo', type: 'image/jpeg' });

        for (let index = 0; index < systemInfo.length; index++) {
            const element = systemInfo[index];
            for (let k in element) {
                data.append(k,element[k])
            }
            
        }

        

        let compId = await SecureStore.getItemAsync('compId');
        let token = await SecureStore.getItemAsync('token');
        let userId = await SecureStore.getItemAsync('id');
        data.append('compId', compId)
        data.append('token', token)
        data.append('userId', userId)

        

        return fetch('https://dc37fbe9c501.ngrok.io/api/reg_system/system_upload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        success: responseJson.success
                    },
                     () => {
                        if (responseJson.success == true) {
                            this.props.navigation.navigate('systemPreviewPanelNav',{
                                systemInfo:systemInfo
                            });

                        }
                        else {
                            alert('Server Could Not Be Reached Please Try Again');

                        }
                    }
                );
            })
            .catch(error => {
                console.error(error);
                alert('Server Could Not Be Reached Please Try Again');
                alert(error);
            });

    }




    render() {

        const imgUri:string = this.props.navigation.getParam('imgUri','')


        

        return (


            <View>

                {this.state.spinner ? <LoadingIcon /> :
                <View>

                    <View style={styles.containerTop}>

                        <View style={styles.logoBox}>
                            <TouchableOpacity onPress={this.goToHome}>

                                <Image style={styles.tinyLogo} source={require('../../assets/icons/cancel-red.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topBar}>
                            <Text style={styles.dispNameText}>Upload Diagram/Photo</Text>
                        </View>
                    </View>

                    <View style={styles.container}>
                        

                    <Image style={styles.ImgPreview} source={{ uri: imgUri }} />

                    <View style={styles.containerRowQuarter}>
                    <TouchableOpacity onPress={() => this.retryPhoto()}  ><Image style={styles.ImgLg} source={require('../../assets/icons/red-retry.png')}/></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.goToRegConfirm(imgUri)}  ><Image style={styles.ImgLg} source={require('../../assets/icons/check-noFill-green.png')}/></TouchableOpacity>
                    </View>
                        

                    </View>
                    
                </View>
                }











            </View>






        );

    }



}