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
    'flashMode':any,
    'capturing': any
    'captures': any,
};

interface ScreenProps {
    navigation: any
}


export default class systemRegDiagramUploadPanel extends React.Component<ScreenProps, ScreenState>{
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
        };

    }


    goToHome = () => {
        this.props.navigation.navigate('HomeNav');
    }

    setFlashMode = (flashMode:any) => this.setState({ flashMode });


    takePicture = async() => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data:any = await this.camera.takePictureAsync(options)
            .then(async (data: { uri: string; }) => {
              console.log('data uri:' + data.uri);
                var formData = new FormData();  
                formData.append('file', {  
                    uri: data.uri,
                    name: 'file',
                    type: 'image/jpg'
                })
              
                return await fetch('http://example.com/upload.php', {
                  method: 'POST',
                  body: formData,
                  headers: {
                    'content-type': 'multipart/form-data',
                  },
                });
            });
        }
      };



    async componentDidMount() {
        var systemInfo:any = this.props.navigation.getParam('systemInfo', {});
        this.setState({systemInfo:systemInfo});

        const camera = await Camera.requestPermissionsAsync();

        const hasCameraPermission = (camera.status === 'granted');

        this.setState({ hasCameraPermission:hasCameraPermission });
        
    };




    render() {

        var flashMode = this.state.flashMode;
        console.log(flashMode)

        

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
                                    ref={ref => {
                                        this.camera = ref;
                                      }}
                                    flashMode={flashMode}
                                    />:
                                    <Text style={styles.textBold}>Camera Denied Permission</Text>


                            }
                        
                        <View style={styles.containerRowQuarter}>
                                <TouchableOpacity onPress={() => this.setState({flashMode:Camera.Constants.FlashMode.torch})}><Image style={styles.ImgLg} source={require('../../assets/icons/flash-on-white.png')}/></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.takePicture()}><Image style={styles.ImgLg} source={require('../../assets/icons/camera-green.png')}/></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({flashMode:Camera.Constants.FlashMode.off})}  ><Image style={styles.ImgLg} source={require('../../assets/icons/flash-off-white.png')}/></TouchableOpacity>
                            </View>
                    </View>
                    
                </View>











            </View>






        );

    }



}