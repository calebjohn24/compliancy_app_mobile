import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homePanel from '.././home'
import RootStack from '../../App'
import styles from '../../styles/systemRegistration/uploadDiagram'
import LoadingIcon from '../../components/loading'
import { SearchBar } from 'react-native-elements';
import { Camera, getPermissionsAsync} from 'expo-camera';


interface ScreenState {
    'compId': any,
    'systemInfo':any,
    'hasCameraPermission': any,
    'camera':any
};

interface ScreenProps {
    navigation: any
}


export default class systemRegDiagramUploadPanel extends React.Component<ScreenProps, ScreenState>{


    constructor(props: any) {
        super(props);
        this.state = {
            'compId': '',
            'systemInfo':{},
            'hasCameraPermission': null,
            'camera':null
        };

    }


    goToHome = () => {
        this.props.navigation.navigate('HomeNav');
    }

    camera = null;


    async componentDidMount() {
        var systemInfo:any = this.props.navigation.getParam('systemInfo', {});
        this.setState({systemInfo:systemInfo});

        const camera = await Camera.requestPermissionsAsync();

        const hasCameraPermission = (camera.status === 'granted');

        this.setState({ hasCameraPermission:hasCameraPermission });
        this.setState({camera:camera});
    };




    render() {


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
                            <Text style={styles.dispNameText}>Upload Diagram/Photo</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        

                            { `${this.state.hasCameraPermission}` ?

                                    <Camera
                                    style={styles.preview}
                                    ref={camera => this.state.camera}
                                    />:
                                    <Text style={styles.textBold}>Camera Denied Permission</Text>


                            }
                        
                        <View style={styles.containerRowQuarter}>
                                <TouchableOpacity ><Image style={styles.ImgLg} source={require('../../assets/icons/company-red.png')}/></TouchableOpacity>
                            </View>
                    </View>
                    
                </View>











            </View>






        );

    }



}