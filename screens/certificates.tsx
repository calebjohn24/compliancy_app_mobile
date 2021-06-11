import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image,  TouchableOpacity,  Linking, FlatList } from 'react-native';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import * as SecureStore from 'expo-secure-store';
import RootStack from '../App'
import styles from '../styles/certificates'
import LoadingIcon from '../components/loading'
export default class certificatesPanel extends React.Component {


    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            'compId': '',
            'certs': {},
            'spinner': true,
        };

    }

    componentDidMount = async () => {


        try {

            let compId = await SecureStore.getItemAsync('compId');
            let token = await SecureStore.getItemAsync('token');
            let userId = await SecureStore.getItemAsync('id');

            this.state.compId = compId;

            return fetch('https://compliancy-app.appspot.com/api/company-certs', {
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
                         () => {
                            this.state.certs = responseJson.certs
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
            this.state.spinner = false
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

        return (

            <View> 
            {this.state.spinner ? <LoadingIcon/>:
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
                        
                    
                
            <> 
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
                </>
                </View>
            }
            </View>

          );
    }




}


