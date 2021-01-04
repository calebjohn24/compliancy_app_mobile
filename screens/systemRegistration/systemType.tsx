import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homePanel from '.././home'
import RootStack from '../../App'
import styles from '../../styles/systemRegistration/systemType'
import LoadingIcon from '../../components/loading'
import { SearchBar } from 'react-native-elements';


interface ScreenState {
    'systemId': any,
    'zoneId': any,
    'systemTypes': any,
    'systemTypesProc': any
    'systemTypesAll': any,
    'compId': any,
    'spinner': boolean,
    'search': string,
    'dataProc': boolean
};

interface ScreenProps {
    navigation: any
}

export default class systemRegSystemTypePanel extends React.Component<ScreenProps, ScreenState>{

    constructor(props: any) {
        super(props);
        this.state = {
            'systemId': '',
            'zoneId': '',
            'systemTypes': {},
            'systemTypesProc': {},
            'systemTypesAll': {},
            'compId': '',
            'spinner': true,
            'search': '',
            'dataProc': false
        };

    }


    componentDidMount = async () => {

        try {

            const systemId: string = this.props.navigation.getParam('systemId', '');
            const zoneId: string = this.props.navigation.getParam('zoneId', '');
            this.setState({
                systemId: systemId,
                zoneId: zoneId
            })
            let compId = await SecureStore.getItemAsync('compId');
            let userId = await SecureStore.getItemAsync('id');
            let token = await SecureStore.getItemAsync('token');
            //var token = SecureStore.getItemAsync('token');


            this.setState({ compId: compId })

            return fetch('https://cd940c5a21e2.ngrok.io/api/reg_system/system_type', {
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
                            systemTypes: responseJson.systemTypes,
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



    renderHeader = () => {
        const { search } = this.state;
        return (
            <SearchBar
                placeholder="Search..."
                onChangeText={text => this.searchAction(text)}
                autoCorrect={false}
                value={search}
                round
            />
        )
    }
    searchAction = (text: string) => {
        const newData = this.state.systemTypesAll.filter(item => {
            const itemData = `${item.id.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;

        });
        //console.log(newData);
        this.setState({
            systemTypesProc: newData,
            search: text
        });

    }


    renderItem = (item: any, systemId: string, zoneId: string) => {
        return (
            <TouchableOpacity onPress={() => this.goToBrand(systemId, zoneId, item.id)}>
                <View key={item.id} style={styles.item}>
                    <Text style={styles.textLightLg}><Image style={styles.ImgLg} source={require('../../assets/icons/gear-white.png')} /> {item.id}</Text>
                    <Text style={styles.textLight}>{item.descrip}</Text>
                </View>
            </TouchableOpacity>
        );
    }




    goToHome = () => {
        this.props.navigation.navigate('HomeNav');
    }

    goToBrand = (systemId: string, zoneId: string, systemType: string) => {
        
        this.props.navigation.navigate('systemRegBrandPanelNav', {
            systemId: systemId,
            zoneId: zoneId,
            systemType: systemType
        });
    }






    render() {


        const { search } = this.state;

        const systemTypesRaw = this.state.systemTypes;

        if (systemTypesRaw.length >= 1 && systemTypesRaw.length != undefined) {
            if (!this.state.dataProc) {
                this.setState({ systemTypesProc: systemTypesRaw })
                this.setState({ systemTypesAll: systemTypesRaw })
                this.setState({ dataProc: true });
            }
        }



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
                                <Text style={styles.dispNameText}>Select System Type</Text>
                            </View>
                        </View>

                        <FlatList
                            ListHeaderComponent={this.renderHeader}
                            data={this.state.systemTypesProc}
                            style={styles.List}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => this.renderItem(item, this.state.systemId, this.state.zoneId)
                            }
                        />



                    </View>







                }
            </View>
        );
    }

}



