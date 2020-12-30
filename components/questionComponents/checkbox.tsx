import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text, Linking, FlatList, SafeAreaView} from 'react-native';
import { CheckBox } from 'react-native-elements'

interface ScreenState {
    'selectedResponses':any,
    'procResps':any,
    'checked':boolean
};

interface ScreenProps {
    'responses': any,
}


export default class CheckAns extends React.Component<ScreenProps, ScreenState>{
    constructor(props: any) {
        super(props);
        this.state = {
            selectedResponses:{},
            procResps:{},
            checked:false
        };

    }
    renderItem = (item:any) => {

        const colors = {
            'dark':'#212126',
            'danger':'#ED1C24',
            'warning':'#F7CE5B',
            'primary':'#1E96FC',
            'success':'#00A878',
            'secondary':'#757575',
            'info':'#64cad1',
        }

        var colorName:string = item['info'][1]['color'];
        var color:string = colors[colorName];


        return (
         
                <View key={item.id} >
                <CheckBox
                        onPress={() => this.setState({checked: !this.state.checked})}
                        title={item['info'][0]['data']}
                        checked={this.state.checked}
                        size={45}
                        containerStyle={{backgroundColor:color, marginVertical:10, borderRadius:10, width:'95%'}}
                        textStyle={{color:'white', fontSize:18}}
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



        for (var key in respsAll) {
            var item = []
            if(key in respsRaw.pop){
                item = [
                    {'data':respsAll[key]['data']},
                    {'color':respsAll[key]['color']},
                    {'popBool':true},
                    {'pop':{
                        'data':respsRaw.pop[key]['data'],
                        'tag':respsRaw.pop[key]['tag'],
                    }}
                ]
                
            }
            else{
            item = [
                {'data':respsAll[key]['data']},
                {'color':respsAll[key]['color']},
                {'popBool':false}
            ]
            }
            respProc.push({
                'info': item,
                'id': key
            });
        }

     

       

        return (
            <View>
                
                    <View style={styles.container}>
                        <Text style={styles.textBold}>Select ALL That Apply</Text>
                        <SafeAreaView> 
                        <FlatList
                            data={respProc}
                            style={styles.List}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => this.renderItem(item)
                            }
                        />
                        </SafeAreaView>
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
        marginBottom:40,
        flexGrow: 1,
        marginHorizontal:1
    },
    item:{
        padding:10,
        borderWidth:0,
        borderRadius:10,
        marginBottom:5,
        marginTop:5,
        backgroundColor:"#fafafa",
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
        margin:10
    },
    textLight: {
        fontWeight: "400",
        fontSize: 16,
        color: "white",
        marginHorizontal:10,
        marginTop:5,
        marginBottom:10
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
        marginHorizontal:10,
        marginVertical:5
    },
    maxImg: {
        width: "95%",
        height: 350,
        resizeMode:"contain",
        marginHorizontal:10,
        marginVertical:5,
    }

});



