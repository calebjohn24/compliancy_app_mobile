import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, YellowBox, TouchableOpacity, TextInput, ScrollView, Linking, SectionList, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as SecureStore from 'expo-secure-store';
import RootStack from '../App'
import { FlatList } from 'react-native';

export default class certificatesPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'compId': '',
            'certs': {}
        };

    }

    componentDidMount = async () => {


        try {


            let compId = await SecureStore.getItemAsync('compId');
            let token = await SecureStore.getItemAsync('token');
            let userId = await SecureStore.getItemAsync('id');

            this.state.compId = compId;

            return fetch('https://a317d66e1ed7.ngrok.io/api/company-certs', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    compId: compId,
                    userId: userId,
                    token: token
                }),
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState(
                        {
                            certs: responseJson.certs
                        },
                        function () {
                            this.state.certs = responseJson.certs
                        }
                    );
                })
                .catch(error => {
                    alert("Cannot Reach Server")
                });




        } catch (error) {
            console.log(error)
            alert("Cannot Reach Server")
        }

    }

    goToInfo = () => {
        this.props.navigation.navigate('InfoNav');
      }

    render() {

        const certs = this.state.certs;

        var certsName = [];
        var certsLinks: any[] = [];

        for (const key in certs) {
            const value = certs[key]['img']
            const keyValue = `${key}`

            certsName.push(keyValue);
            certsLinks.push(value);
        }
        //console.log(certsName)

        return (
            <View> 
            <View style={styles.containerTop}>

                <View style={styles.logoBox}>
                <TouchableOpacity onPress={this.goToInfo}>

                    <Image style={styles.tinyLogo} source={require('../assets/icons/back-arrow.png')} />
                </TouchableOpacity>
                </View>
                <View style={styles.topBar}>
                <Text style={styles.dispNameText}>Certificates</Text>
                </View>


                </View>
            <View> 
                <FlatList
                    
                    data={certsName}
                    style={styles.List}
                    keyExtractor={(item, index) => 'key'+index}
                    renderItem={({ item }) => (
                    <>
                    
                    
                
                    <View>
                    <View style={styles.containerRow0}>
                    
                    <View style={styles.rowText}>
                        <Text style={styles.textLightLg}>{item}</Text>
                    </View>
                    <View style={styles.buttonMdBox}>
                        <TouchableOpacity onPress={() => Linking.openURL( certs[`${item}`]['img'])}>

                            <Image style={styles.buttonImgMd} source={require('../assets/icons/cert-green.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
           
                <View style={styles.maxImgBox}>
                <Image style={styles.maxImg} source={{ uri: certs[`${item}`]['img'] }} />
                </View>
                </View>
                
           


                   
                
                    
                    </>
                    )}
                />
                </View>
            </View>

          );
    }




}



const styles = StyleSheet.create({
    mainList: {
        flexGrow: 1
       },
    container: {
        flex: 1,
        backgroundColor: '#212126',
        alignItems: 'center',
        justifyContent: 'center',
    },
    List: {
        marginTop:120,
        marginBottom:10,
        flexGrow: 1,
        
        
    },
    scrollView: {
        marginHorizontal: 5,
        marginVertical: 10,
    },

    containerTop: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 0.75,
        height: 150
    },
    containerRow0: {
        flexDirection: 'row',
        height: 80,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    containerRowImg: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        

    },
    RowDiv: {
        height: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    containerRowList: {
        flex:1,
        
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    topBar: {
        flex: 1,
        height: 140,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    logoBox: {
        flex: 0.38,
        height: 150,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    buttonSmBox: {
        flex: 0.25,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonMdBox: {
        flex: 0.35,
        height: 80,
        justifyContent: 'center',
        alignItems: 'baseline',
    },
    maxImgBox: {
        justifyContent: 'flex-start',
        alignItems: 'center'
        
    },
    maxImg: {
        margin: 0,
        width: 300,
        height: 300,
        resizeMode: 'contain'
    },
    dispNameText: {
        fontWeight: "bold",
        fontSize: 24,
        color: "white",
        margin: 30,
        textAlign: 'center'
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white",
        textAlign: 'left'
    },
    textLight: {
        fontWeight: "200",
        fontSize: 20,
        color: "white",
        margin: 30,
        textAlign: 'auto'
    },
    textLightSm: {
        fontWeight: "200",
        fontSize: 16,
        color: "white",
        margin: 30,
        textAlign: 'auto'
    },
    textLightLg: {
        fontWeight: "200",
        fontSize: 22,
        color: "white",
        margin: 30,
        textAlign: 'auto'
    },
    buttonText: {
        fontWeight: "100",
        fontSize: 20,
        color: "white",
        textAlign: 'center'
    },
    tinyLogo: {
        margin: 20,
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },

    rowText: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        height: 80,

    },
    rowButton: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonImgLg: {
        margin: 20,
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    buttonImgSm: {

        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
    buttonImgMd: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    ImgLg: {

        width: 35,
        height: 35,
        resizeMode: 'contain'
    }
})

//Dark:#212126
//Red:#ED1C24
//Yellow:#F7CE5B
//Blue:#1E96FC
//Green:#00A878
