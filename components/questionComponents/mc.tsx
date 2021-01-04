import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text, Linking, FlatList, SafeAreaView, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements'

interface ScreenState {
    'selectedResponses': string,
    'respProc': any,
    'checked': boolean,
    'procDone': boolean,
    'tag': string
};

interface ScreenProps {
    'responses': any,
    'tag':any
}


export default class MulAns extends React.Component<ScreenProps, ScreenState>{
    constructor(props: any) {
        super(props);
        this.state = {
            selectedResponses: '',
            respProc: {},
            checked: false,
            procDone: false,
            tag: ''
        };

    }

    componentDidMount = () =>{
        var tag:string = this.props.tag
        this.setState({
            tag:tag
        });
    }

    setCheckData(data:string, tag:string){
        this.props.callback(data, tag);
    }

    checkBox = (itemId: any, isChecked: boolean) => {

        var currReps = this.state.respProc;

        var returnResponse: string = '';

        var currTag = this.props.tag;

        for (var key in currReps) {

            if (currReps[key]['id'] == itemId) {
                var newStateCheck: boolean = true;
                currReps[key]['info'][3]['checked'] = newStateCheck
                var popBool: boolean = currReps[key]['info'][2]['popBool']
                if (newStateCheck && popBool) {
                    Alert.alert(currReps[key]['info'][4]['pop']['data'])
                    var newTag = currReps[key]['info'][4]['pop']['tag'];
                }
            }
            else{
                var newStateCheck: boolean = false;
                currReps[key]['info'][3]['checked'] = newStateCheck
            }


        }

        for (var key in currReps) {
            var stateCheck: boolean = currReps[key]['info'][3]['checked'];
            if (stateCheck) {
                returnResponse = currReps[key]['info'][0]['data'];
            }

            var popBool: boolean = currReps[key]['info'][2]['popBool']
            if (popBool) {
                var newTag = currReps[key]['info'][4]['pop']['tag'];
                var stateCheck: boolean = currReps[key]['info'][3]['checked'];
                //console.log(newTag + ' |new|old ' + currTag)
                if (stateCheck && newTag != 'no' && currTag != 'red') {
                    if (currTag == 'white') {
                        currTag = newTag;
                    }
                    else if (currTag == 'yellow') {
                        if(newTag != 'white'){
                            currTag = newTag
                        }
                    }
    
                }
            }

        }

        var selectedResponses: string = returnResponse


        this.setState({
            respProc: currReps,
            selectedResponses: selectedResponses,
            tag:currTag
        });

        this.setCheckData(selectedResponses, currTag);


    }

    renderItem = (item: any) => {

        const colors = {
            'dark': '#212126',
            'danger': '#ED1C24',
            'warning': '#F7CE5B',
            'primary': '#1E96FC',
            'success': '#00A878',
            'secondary': '#757575',
            'info': '#64cad1',
        }

        var colorName: string = item['info'][1]['color'];
        var color: string = colors[colorName];
        var checked: boolean = item['info'][3]['checked']


        return (

            <View key={item.id} style={styles.item}>
                <CheckBox
                    onPress={() => this.checkBox(item.id, checked)}
                    title={item['info'][0]['data']}
                    checked={checked}
                    size={45}
                    containerStyle={{ backgroundColor: color, marginVertical: 10, borderRadius: 10, width: '90%' }}
                    textStyle={{ color: 'white', fontSize: 18 }}
                    checkedColor={'white'}
                    uncheckedColor={'white'}
                />
            </View>
        );
    }

    render() {

        const respsRaw = this.props.responses;
        const respsAll = respsRaw.ans;
        var respProc = [];

        var count: number = 0;
        var returnResponseDefault:string = '';
        for (var key in respsAll) {
            var item = []
            var setBool: boolean = false;
            if(count == 0){
                setBool = true;
                returnResponseDefault = respsAll[key]['data'];
            }
            count ++;
            var popBool: boolean = false;
            if('pop' in respsRaw){
                popBool = true;
            }
            if (popBool) {
                if(key in respsRaw.pop){
                item = [
                    { 'data': respsAll[key]['data'] },
                    { 'color': respsAll[key]['color'] },
                    { 'popBool': true },
                    { 'checked': setBool },
                    {
                        'pop': {
                            'data': respsRaw.pop[key]['data'],
                            'tag': respsRaw.pop[key]['tag'],
                        }
                    }
                ]
                }
                else{
                    item = [
                        { 'data': respsAll[key]['data'] },
                        { 'color': respsAll[key]['color'] },
                        { 'popBool': false },
                        { 'checked': setBool },
                    ]
                }
            }
            else {
                item = [
                    { 'data': respsAll[key]['data'] },
                    { 'color': respsAll[key]['color'] },
                    { 'popBool': false },
                    { 'checked': setBool },
                ]
            }
            respProc.push({
                'info': item,
                'id': key
            });
        }

        if (!this.state.procDone) {
            this.setState({
                respProc: respProc,
                procDone: true,
                selectedResponses:returnResponseDefault
            })
        }







        return (
            <View>

                <View style={styles.container}>
                    <Text style={styles.textBold}>Select ONE Option</Text>
                    
                        <FlatList
                            data={this.state.respProc}
                            style={styles.List}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => this.renderItem(item)
                            }
                        />
                    
                </View>


            </View>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        height: "auto",
        marginVertical: 5,
        marginHorizontal: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    List: {
        marginBottom: 40,
        flexGrow: 1,
        marginHorizontal: 1
    },
    item: {
        width:'100%',
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
        margin: 10
    },
    textLight: {
        fontWeight: "400",
        fontSize: 16,
        color: "white",
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 10
    },
    textLightSm: {
        fontWeight: "400",
        fontSize: 16,
        color: "white",
        textAlign: 'auto'
    },
    textLightLg: {
        fontWeight: "400",
        fontSize: 20,
        color: "white",
        marginHorizontal: 10,
        marginVertical: 5
    },
    maxImg: {
        width: "95%",
        height: 350,
        resizeMode: "contain",
        marginHorizontal: 10,
        marginVertical: 5,
    }

});



