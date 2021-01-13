import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homePanel from '.././home'
import RootStack from '../../App'
import styles from '../../styles/systemRegistration/brand'
import LoadingIcon from '../../components/loading'
import { SearchBar } from 'react-native-elements';


interface ScreenState {
    'systemId': string,
    'zoneId': string,
    'systemType': string,
    'brands':any,
    'certReq':any,
    'brandsProc': any
    'brandsAll': any,
    'compId': any,
    'spinner': boolean,
    'search': string,
    'dataProc': boolean
};

interface ScreenProps {
    navigation: any
}

export default class systemRegBrandPanel extends React.Component<ScreenProps, ScreenState>{

    constructor(props: any) {
        super(props);
        this.state = {
            'systemId': '',
            'zoneId': '',
            'systemType': '',
            'brands':{},
            'certReq':'yes',
            'brandsProc': {},
            'brandsAll': {},
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
            const systemType: string = this.props.navigation.getParam('systemType','');

            this.setState({
                systemId:systemId,
                zoneId:zoneId,
                systemType:systemType
            })
            
            let compId = await SecureStore.getItemAsync('compId');
            let userId = await SecureStore.getItemAsync('id');
            let token = await SecureStore.getItemAsync('token');
            //var token = SecureStore.getItemAsync('token');


            this.setState({ compId: compId })

            return fetch('https://dc37fbe9c501.ngrok.io/api/reg_system/brand', {
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
                    systemType:systemType,
                    zoneId: zoneId,
                }),
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState(
                        {
                            brands: responseJson.certs,
                            certReq: responseJson.cert_req
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
        const newData = this.state.brandsAll.filter((item: { data: string; }) => {
            const itemData = `${item.data.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;

        });
        this.setState({
            brandsProc: newData,
            search: text
        });

    }


    renderItem = (item: any, systemId: string, zoneId: string, systemType: string) => {
        return (
            <TouchableOpacity onPress={() => this.goToLocation(systemId,zoneId,item.data, systemType)}>
                <View key={item.id} style={styles.item}>
                    <Text style={styles.textLightLg}><Image style={styles.ImgLg} source={require('../../assets/icons/brand-blue.png')}/>  {item.data}</Text>
                </View>
            </TouchableOpacity>

        );
    }


    


    goToHome = () => {
        this.props.navigation.navigate('HomeNav');
    }

    goToLocation = (systemId: string, zoneId: string, brand:string, systemType:string) => {
        this.props.navigation.navigate('systemRegLocationPanelNav', {
            systemId: systemId,
            zoneId: zoneId,
            brand: brand,
            systemType:systemType
        });
    }
    



    render() {


        const { search } = this.state;

        const brandsRaw = this.state.brands;
        var brands = [];

        if (brandsRaw.length >= 1 && brandsRaw.length != undefined) {
            if (!this.state.dataProc) {

                for (var i in brandsRaw) {
                    brands.push({
                        'data': `${brandsRaw[i]}`,
                        'id': `${i}`
                    });
                }

                this.setState({ brandsProc: brands })
                this.setState({ brandsAll: brands })
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
                                <Text style={styles.dispNameText}>Select System Brand</Text>
                            </View>
                        </View>

                        <FlatList
                            ListHeaderComponent={this.renderHeader}
                            data={this.state.brandsProc}
                            style={styles.List}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => this.renderItem(item, this.state.systemId, this.state.zoneId, this.state.systemType)
                            }
                        />



                    </View>







                }
            </View>
        );
    }

}



