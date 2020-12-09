import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, YellowBox, TouchableOpacity, TextInput, ScrollView, Linking, SectionList, SafeAreaView, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as SecureStore from 'expo-secure-store';
import homePanel from './home'
import RootStack from '../App'
import { FlatList } from 'react-native';
import styles from '../styles/findReports'
import LoadingIcon from '../components/loading'
import Constants from 'expo-constants';
import { SearchBar } from 'react-native-elements';

export default class findReportsPanel extends React.Component {


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

            return fetch('https://1ab18b31c7bb.ngrok.io/api/list-hoods', {
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
                placeholder="Search"
                onChangeText={text => this.searchAction(text)}
                autoCorrect={false}
                lightTheme
                value={search}
            />
        )
    }
    searchAction = (text) => {
        const newData = this.state.systemsProcAll.filter(item => {
            const itemData = `${item.data.addr.toUpperCase()}`;
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
            <View key={item.id} style={styles.item}>

                <TouchableOpacity onPress={() => this.showItem(item.data.addr)}>
                    <Text style={styles.textLightSm}>{item.data.addr}</Text>
                </TouchableOpacity>
                
            </View>
        );
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


