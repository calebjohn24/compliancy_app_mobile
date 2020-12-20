import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homePanel from '.././home'
import RootStack from '../../App'
import styles from '../../styles/systemRegistration/uploadDiagram'
import LoadingIcon from '../../components/loading'
import { SearchBar } from 'react-native-elements';


interface ScreenState {
    'compId': any,
    'systemInfo':any,
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
        };

    }

    componentDidMount = () =>{

        var systemInfo:any = this.props.navigation.getParam('systemInfo', {});
        this.setState({systemInfo:systemInfo});



    }

    goToHome = () => {
        this.props.navigation.navigate('HomeNav');
    }




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
                        <ScrollView style={styles.scrollView}>







                        </ScrollView>
                    </View>
                </View>











            </View>






        );

    }



}