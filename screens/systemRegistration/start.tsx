import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homePanel from '.././home'
import RootStack from '../../App'
import styles from '../../styles/systemRegistration/start'
import LoadingIcon from '../../components/loading'
import { SearchBar } from 'react-native-elements';


interface ScreenState {
    'systemId': any,
    'zones': any,
    'zonesProc':any
    'zonesAll':any,
    'compId': any,
    'spinner':boolean,
    'search':string,
    'dataProc':boolean
};

interface ScreenProps {
    navigation: any
}

export default class systemRegStartPanel extends React.Component <ScreenProps, ScreenState>{

    constructor(props:any) {
        super(props);
        this.state = {
            'systemId': '',
            'zones': {},
            'zonesProc':{},
            'zonesAll':{},
            'compId': '',
            'spinner':true,
            'search':'',
            'dataProc':false
        };

    }


    componentDidMount = async () => {

        try {


            let compId = await SecureStore.getItemAsync('compId');
            let userId = await SecureStore.getItemAsync('id');
            let token = await SecureStore.getItemAsync('token');
            //var token = SecureStore.getItemAsync('token');
            
            this.setState({ compId: compId })

            return fetch('https://d1c62bb6557a.ngrok.io/api/reg_system/start', {
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
                            systemId: responseJson.systemId,
                            zones: responseJson.zones
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
    searchAction = (text:string) => {
        const newData = this.state.zonesAll.filter(item => {
            const itemData = `${item.data.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;

        });
        //console.log(newData);
        this.setState({
            zonesProc: newData,
            search: text
        });

    }


    renderItem = (item:any, systemId:string) => {
        return (
            <TouchableOpacity onPress={() => this.goToSystemType(systemId,item.data)}>
                <View key={item.id} style={styles.item}>
                    <Text style={styles.textLightLg}><Image style={styles.ImgLg} source={require('../../assets/icons/red-law.png')}/>  {item.data}</Text>
                </View>
            </TouchableOpacity>
        );
    }



      goToHome = () => {
        this.props.navigation.navigate('HomeNav');
    }

    goToSystemType = (systemId:string,zoneId:string) =>{
        this.props.navigation.navigate('systemRegSystemTypePanelNav',{
            systemId:systemId,
            zoneId:zoneId
        });
    }


 

    render() {




        const { search } = this.state;

        const zonesRaw = this.state.zones;

        var zones = [];
        if(this.state.zones.length != undefined){
        if (this.state.zones.length >= 1) {

            if (!this.state.dataProc) {
                
                for (var i in zonesRaw) {
                    zones.push({
                        'data': `${zonesRaw[i]}`,
                        'id': `${i}`
                    });
                }
  

                this.setState({zonesProc:zones})
                this.setState({zonesAll:zones})
                this.setState({dataProc:true});

            }
        }
    }
        

        
        return (
            <View>
                {this.state.spinner ? <LoadingIcon /> :
                    <View>

                        <View style={styles.containerTop}>

                            <View style={styles.logoBox}>
                                <TouchableOpacity onPress={this.goToHome}>

                                    <Image style={styles.tinyLogo} source={require('../../assets/icons/back-arrow.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.topBar}>
                                <Text style={styles.dispNameText}>Select Jurisdiction</Text>
                            </View>
                        </View>

                        <FlatList
                            ListHeaderComponent={this.renderHeader}
                            data={this.state.zonesProc}
                            style={styles.List}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => this.renderItem(item,this.state.systemId)
                            }
                        />



                    </View>
                    






                }
            </View>
        );
    }

}



