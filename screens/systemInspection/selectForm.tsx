import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homePanel from '.././home'
import RootStack from '../../App'
import styles from '../../styles/systemInspection/selectForm'
import LoadingIcon from '../../components/loading'
import { SearchBar } from 'react-native-elements';


interface ScreenState {
    'systemId': any,
    'zoneId': any,
    'forms': any,
    'formsProc': any
    'formsAll': any,
    'compId': any,
    'reportId':string,
    'spinner': boolean,
    'search': string,
    'dataProc': boolean
};

interface ScreenProps {
    navigation: any
}

export default class systemInspectListFormsPanel extends React.Component<ScreenProps, ScreenState>{

    constructor(props: any) {
        super(props);
        this.state = {
            'systemId': '',
            'zoneId': '',
            'forms': [],
            'formsProc': [],
            'formsAll': [],
            'compId': '',
            'reportId':'',
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

            return fetch('https://dc37fbe9c501.ngrok.io/api/system_inspect/list_forms', {
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
                            forms: responseJson.forms,
                            zoneId:responseJson.zone,
                            reportId:responseJson.reportId
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
        const newData = this.state.formsAll.filter((item:any) => {
            const itemData = `${item.data.name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;

        });
        //console.log(newData);
        this.setState({
            formsProc: newData,
            search: text
        });

    }


    renderItem = (item: any) => {
        return (
            <TouchableOpacity onPress={() => this.goToForm(item.id, item.data.name)}>
                <View key={item.id} style={styles.item}>
                    <Text style={styles.textLightLg}><Image style={styles.ImgLg} source={require('../../assets/icons/form-green.png')} /> {item.data.name}</Text>
                    <Text style={styles.textLight}>{item.data.descrip}</Text>
                </View>
            </TouchableOpacity>
        );
    }




    goToSystemInfo = () => {
        this.props.navigation.navigate('SystemInfoNav', {system: this.state.systemId});
      }
    

    goToForm = (formId:string, formName:string) => {
        this.props.navigation.navigate('systemInspectQuestionPanelNav', {
            systemId: this.state.systemId,
            zoneId:this.state.zoneId,
            formId: formId,
            formName:formName,
            reportId:this.state.reportId,
            formIndex:0
        });
      }

    






    render() {


        const { search } = this.state;

        const formsRaw = this.state.forms;

        //console.log(formsRaw.length)
        //console.log(formsRaw)

        if (formsRaw.length != 0) {
            if (!this.state.dataProc) {

                var forms = [];
                for (var key in formsRaw) {
                    var value = formsRaw[key];
                    //TODO Add if statement to check for questions
                    forms.push({
                        data: value,
                        'id': `${key}`
                    });

                }

                this.setState({ formsProc: forms })
                this.setState({ formsAll: forms })
                this.setState({ dataProc: true });
            
            }
        }


        return (
            <View>
                {this.state.spinner ? <LoadingIcon /> :
                    <View>

                        <View style={styles.containerTop}>

                            <View style={styles.logoBox}>
                                <TouchableOpacity onPress={() => this.goToSystemInfo()}>

                                    <Image style={styles.tinyLogo} source={require('../../assets/icons/cancel-red.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.topBar}>
                                <Text style={styles.dispNameText}>Select Report</Text>
                            </View>
                        </View>

                        <FlatList
                            ListHeaderComponent={this.renderHeader}
                            data={this.state.formsProc}
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



