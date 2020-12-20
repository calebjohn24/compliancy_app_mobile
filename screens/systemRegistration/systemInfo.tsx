import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homePanel from '.././home'
import RootStack from '../../App'
import styles from '../../styles/systemRegistration/systemInfo'
import LoadingIcon from '../../components/loading'
import { SearchBar } from 'react-native-elements';


interface ScreenState {
    'compId': any,
    'systemInfo':any,
    'email': string,
    'name': string,
    'owner':string,
    'phone': string
};

interface ScreenProps {
    navigation: any
}


export default class systemRegInfoPanel extends React.Component<ScreenProps, ScreenState>{


    constructor(props: any) {
        super(props);
        this.state = {
            'compId': '',
            'systemInfo':{},
            'email': '',
            'name': '',
            'owner':'',
            'phone': ''
        };

    }



    goToHome = () => {
        this.props.navigation.navigate('HomeNav');
    }

    goToPhotoUploadScreen = () => {

        const email:string = this.state.email;
        const name:string = this.state.name;
        const owner:string = this.state.owner;
        const phone:string = this.state.phone;


        var systemInfo:any = this.props.navigation.getParam('systemInfo', {});

        this.setState({systemInfo:systemInfo});

        systemInfo.push({
            'email':email,
        })
        systemInfo.push({
            'phone':phone,
        })
        systemInfo.push({
            'owner':owner,
        })
        systemInfo.push({
            'name':name,
        })

        this.props.navigation.navigate('systemRegDiagramUploadPanelNav', {
            systemInfo:systemInfo
        });
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
                            <Text style={styles.dispNameText}>Enter System Info</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <ScrollView style={styles.scrollView}>

    
                            <View style={styles.containerRowQuarter}>
                                <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../../assets/icons/company-red.png')}/> Company Name</Text>
                            </View>
                            <View style={styles.containerRowQuarter}>
                                <View style={styles.inputView}>
                                    <TextInput style={styles.inputText}
                                        placeholder="Business Name..."
                                        autoCapitalize="characters"
                                        placeholderTextColor="#969696"
                                        onChangeText={text => this.setState({ name: text })}
                                    />
                                </View>
                            </View>

                            <View style={styles.containerRowQuarter}>
                                <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../../assets/icons/user-green.png')}/> Contact Name</Text>
                            </View>
                            <View style={styles.containerRowQuarter}>
                                <View style={styles.inputView}>
                                    <TextInput style={styles.inputText}
                                        placeholder="Contact Name..."
                                        autoCapitalize="words"
                                        placeholderTextColor="#969696"
                                        onChangeText={text => this.setState({ owner: text })}
                                    />
                                </View>
                            </View>


                            <View style={styles.containerRowQuarter}>
                                <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../../assets/icons/mail.png')}/> Contact Email</Text>
                            </View>
                            <View style={styles.containerRowQuarter}>
                                <View style={styles.inputView}>
                                    <TextInput style={styles.inputText}
                                        placeholder="Contact Email..."
                                        autoCompleteType="email"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        placeholderTextColor="#969696"
                                        onChangeText={text => this.setState({ email: text })}
                                    />
                                </View>
                            </View>


                            <View style={styles.containerRowQuarter}>
                                <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../../assets/icons/phone.png')}/> Contact Phone</Text>
                            </View>
                            <View style={styles.containerRowQuarter}>
                                <View style={styles.inputView}>
                                    <TextInput style={styles.inputText}
                                        placeholder="Contact Phone..."
                                        autoCompleteType="tel"
                                        keyboardType="phone-pad"
                                        autoCapitalize="none"
                                        placeholderTextColor="#969696"
                                        onChangeText={text => this.setState({ phone: text })}
                                    />
                                </View>
                            </View>
    

                            <View style={styles.containerRowBtn}>
                                <TouchableOpacity onPress={() => this.goToPhotoUploadScreen()} style={styles.changeBtn}>
                                    <Text style={styles.textLight}>Next <Image style={styles.ImgMd} source={require('../../assets/icons/inline-nextarrow-white.png')} /></Text>
                                </TouchableOpacity>
                            </View>





                        </ScrollView>
                    </View>
                </View>











            </View>






        );

    }



}