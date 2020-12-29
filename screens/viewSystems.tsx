import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, YellowBox, TouchableOpacity, TextInput, ScrollView, Linking, SectionList, SafeAreaView, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homePanel from './home'
import RootStack from '../App'
import { FlatList } from 'react-native';
import styles from '../styles/viewSystems'
import LoadingIcon from '../components/loading'
import { SearchBar } from 'react-native-elements';

export default class viewSystemPanel extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            systems: [],
            spinner: true,
            search: "",
            systemsProc: [],
            systemsProcAll: [],
            dataProc: false
        };

    }



    componentDidMount = async () => {

        try {


            let compId = await SecureStore.getItemAsync('compId');
            let userId = await SecureStore.getItemAsync('id');
            let token = await SecureStore.getItemAsync('token');
            //var token = SecureStore.getItemAsync('token');

            return fetch('https://2af1f7fddb40.ngrok.io/api/list-systems', {
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
                            systems: responseJson.systems,
                        },
                        function () {
                            this.state.systems = responseJson.systems
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

    

    goToHome = () => {
        this.props.navigation.navigate('HomeNav');
    }

    


    showItem = (data) => {
        Alert.alert(data);
    }

    renderHeader = () => {
        const { search } = this.state;
        return (
            <SearchBar
                placeholder="Search By Business"
                onChangeText={text => this.searchAction(text)}
                autoCorrect={false}
                value={search}
                round
            />
        )
    }
    searchAction = (text) => {
        const newData = this.state.systemsProcAll.filter(item => {
            const itemData = `${item.data.name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;

        });
        //console.log(newData);
        this.setState({
            systemsProc: newData,
            search: text
        });

    }


    renderItem = (item) => {
        return (
            <TouchableOpacity onPress={() => this.goToSystemInfo(item.id)}>
                <View key={item.id} style={styles.item}>
                    <Text style={styles.textLightLg}>{item.data.name}</Text>
                    { `${item.data.active}` == "yes" ?
                    <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../assets/icons/power-green.png')}/> Active</Text>:
                    <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../assets/icons/power-red.png')}/> Inactive</Text>
                    }
                    {`${item.data.tag}` == "Red" ?
                    <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../assets/icons/tag-red.png')} /> Red</Text>:
                    <></>
                    }
                    {`${item.data.tag}` == "Yellow" ?
                    <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../assets/icons/tag-yellow.png')} /> Yellow</Text>:
                    <></>
                    }
                    {`${item.data.tag}` == "White" ?
                    <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../assets/icons/tag-white.png')} /> White</Text>:
                    <></>
                    }
                    <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../assets/icons/id.png')}/> #{item.id}</Text>
                    <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../assets/icons/gear-white.png')}/> {item.data.type}</Text>

                    <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../assets/icons/user-green.png')}/> {item.data.owner}</Text>
                    <Text style={styles.textLightSm}><Image style={styles.ImgMd} source={require('../assets/icons/map-blue.png')}/> {item.data.addr} {item.data.city} {item.data.state}</Text>
                    <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../assets/icons/red-law.png')}/> {item.data.zone}</Text>
                    <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../assets/icons/brand-blue.png')}/> {item.data.brand}</Text>

                </View>
            </TouchableOpacity>
        );
    }

    goToSystemInfo = (systemId: string) => {
        this.props.navigation.navigate('SystemInfoNav', {system: systemId});
      }




    render() {




        const { search } = this.state;

        const systemsRaw = this.state.systems;

        if (this.state.systems.length != 0) {

            if (!this.state.dataProc) {
                var systems = [];
                for (var key in systemsRaw) {
                    var value = systemsRaw[key];
                    systems.push({
                        data: value,
                        'id': `${key}`
                    });
                }
                this.state.systemsProc = systems;
                this.state.systemsProcAll = systems;
                this.state.dataProc = true;
            }
        }
        
        return (
            <View>
                {this.state.spinner ? <LoadingIcon /> :
                    <View>

                        <View style={styles.containerTop}>

                            <View style={styles.logoBox}>
                                <TouchableOpacity onPress={this.goToHome}>

                                    <Image style={styles.tinyLogo} source={require('../assets/icons/back-arrow.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.topBar}>
                                <Text style={styles.dispNameText}>Systems</Text>
                            </View>
                        </View>

                        <FlatList
                            ListHeaderComponent={this.renderHeader}
                            data={this.state.systemsProc}
                            style={styles.List}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => this.renderItem(item)
                            }
                        />



                    </View>






                }
            </View>
        );
    }
}


