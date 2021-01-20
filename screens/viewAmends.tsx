import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homePanel from './home'
import RootStack from '../App'
import styles from '../styles/viewAmends'
import LoadingIcon from '../components/loading'
import { SearchBar } from 'react-native-elements';


interface ScreenState {
    'amends':any,
    'amendsProc': any
    'amendsAll': any,
    'compId': any,
    'spinner': boolean,
    'search': string,
    'dataProc': boolean
};

interface ScreenProps {
    navigation: any
}

export default class viewAmendsPanel extends React.Component<ScreenProps, ScreenState>{

    constructor(props: any) {
        super(props);
        this.state = {
            'amends':{},
            'amendsProc': {},
            'amendsAll': {},
            'compId': '',
            'spinner': true,
            'search': '',
            'dataProc': false
        };

    }


    componentDidMount = async () => {

        try {

            
            
            let compId = await SecureStore.getItemAsync('compId');
            let userId = await SecureStore.getItemAsync('id');
            let token = await SecureStore.getItemAsync('token');
            //var token = SecureStore.getItemAsync('token');


            this.setState({ compId: compId })

            return fetch('https://064710b2d906.ngrok.io/api/get-amends', {
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
                    if(responseJson.amends_bool){
                    this.setState(
                        {
                            amends:responseJson.amends,
                        }
                    );

                    }
                    else{
                        Alert.alert('No Amendment Requests Have Been Filed');
                        this.props.navigation.navigate('HomeNav');
                    }
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
                placeholder="Enter Code..."
                onChangeText={text => this.searchAction(text)}
                autoCorrect={false}
                keyboardType="numeric"
                value={search}
                round
            />
        )
    }
    searchAction = (text: string) => {
        const newData = this.state.amendsAll.filter((item: { id: string; }) => {
            const itemData = `${item.id.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;

        });
        this.setState({
            amendsProc: newData,
            search: text
        });

    }


    renderItem = (item: any) => {
        return (
            <TouchableOpacity onPress={() => this.goToPreview(item)}>
                <View key={item.id} style={styles.item}>
                    <Text style={styles.textLightLg}><Image style={styles.ImgLg} source={require('../assets/icons/tag-white.png')}/> {item.id}</Text>
                    <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../assets/icons/calendar-green.png')}/> {item.data.time_stamp}</Text>
                </View>
            </TouchableOpacity>

        );
    }


    


    goToHome = () => {
        this.props.navigation.navigate('HomeNav');
    }

    goToPreview = (item: any) => {
        this.props.navigation.navigate('startAmendPanelNav', {
            'item':item
        });
    }
    



    render() {


        const { search } = this.state;

        const amendsRaw = this.state.amends;
        var amends = [];

        


        if (Object.keys(amendsRaw).length >= 1 && Object.keys(amendsRaw).length!= undefined) {
            if (!this.state.dataProc) {

                for (var i in amendsRaw) {

                    amends.push({
                        'data': amendsRaw[i],
                        'id': `${i}`
                    });

                }

                this.setState({ amendsProc: amends })
                this.setState({ amendsAll: amends })
                this.setState({ dataProc: true });
            }
        }


        /*

        

        
        */


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
                                <Text style={styles.dispNameText}>Amendments</Text>
                            </View>
                        </View>
                        <FlatList
                        ListHeaderComponent={this.renderHeader}
                        data={this.state.amendsProc}
                        style={styles.List}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => this.renderItem(item)}
                        />

                        



                    </View>







                }
            </View>
        );
    }

}



