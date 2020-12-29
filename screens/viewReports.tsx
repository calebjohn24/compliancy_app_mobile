import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, YellowBox, TouchableOpacity, TextInput, ScrollView, Linking, SectionList, SafeAreaView, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homePanel from './home'
import RootStack from '../App'
import { FlatList } from 'react-native';
import styles from '../styles/viewReports'
import LoadingIcon from '../components/loading'
import { SearchBar } from 'react-native-elements';

export default class viewReportsPanel extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            systemId: "",
            spinner: true,
            search: "",
            reports:[],
            reportsProc: [],
            reportsProcAll: [],
            dataProc: false,
            compId:""
        };

    }



    componentDidMount = async () => {

        try {


            let compId = await SecureStore.getItemAsync('compId');
            let userId = await SecureStore.getItemAsync('id');
            let token = await SecureStore.getItemAsync('token');
            //var token = SecureStore.getItemAsync('token');
            const systemId: string = this.props.navigation.getParam('systemId', 'none');
            this.state.systemId = systemId;
            this.state.compId = compId

            return fetch('https://2af1f7fddb40.ngrok.io/api/view-reports', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    compId: compId,
                    userId: userId,
                    token: token,
                    systemId:systemId
                }),
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState(
                        {
                            reports: responseJson.reports,
                        },
                        function () {
                            this.state.reports = responseJson.reports
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
                placeholder="Search By Date"
                onChangeText={text => this.searchAction(text)}
                autoCorrect={false}
                value={search}
                round
            />
        )
    }
    searchAction = (text) => {
        const newData = this.state.reportsProcAll.filter(item => {
            const itemData = `${item.data.time_stamp.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;

        });
        //console.log(newData);
        this.setState({
            reportsProc: newData,
            search: text
        });

    }


    renderItem = (item) => {
        const link = 'https://2af1f7fddb40.ngrok.io/' + this.state.compId + '/view-report/'+ item.id + '/' + item.data.token + '/public'
        return (
            <TouchableOpacity onPress={() => this.goToReportInfo(link, this.state.systemId)}>
                <View key={item.id} style={styles.item}>
                    <Text style={styles.textLightLg}><Image style={styles.ImgMd} source={require('../assets/icons/calendar-green.png')}/> {item.data.time_stamp}</Text>
                    <Text style={styles.textLightSm}><Image style={styles.ImgMd} source={require('../assets/icons/certificate.png')}/> {item.data.cert}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    goToSystemInfo = (systemId: string) => {
        this.props.navigation.navigate('SystemInfoNav', {system: systemId});
      }
    
      goToReportInfo = (link: string, systemId:string) => {
        this.props.navigation.navigate('reportWebviewPanelNav', {link: link, system:systemId});
      }



    render() {

        const { search } = this.state;
    

        const reportsRaw = this.state.reports;

        if (this.state.reports.length != 0) {

            if (!this.state.dataProc) {
                var reports = [];
                for (var key in reportsRaw) {
                    var value = reportsRaw[key];
                    reports.push({
                        data: value,
                        'id': `${key}`
                    });
                }
                this.state.reportsProc = reports;
                this.state.reportsProcAll = reports;
                this.state.dataProc = true;
            }
        }


        
        return (
            <View>
                {this.state.spinner ? <LoadingIcon /> :
                    <View>

                        <View style={styles.containerTop}>

                            <View style={styles.logoBox}>
                                <TouchableOpacity onPress={() => this.goToSystemInfo(this.state.systemId)}>

                                    <Image style={styles.tinyLogo} source={require('../assets/icons/back-arrow.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.topBar}>
                                <Text style={styles.dispNameText}>Reports</Text>
                            </View>
                        </View>

                        <FlatList
                            ListHeaderComponent={this.renderHeader}
                            data={this.state.reportsProc}
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


