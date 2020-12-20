import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import RootStack from '../../App'
import styles from '../../styles/systemRegistration/customInfo'
import LoadingIcon from '../../components/loading'
import { SearchBar } from 'react-native-elements';

interface ScreenState {
    'burner': string,
    'model': string,
    'location': string,
};

interface ScreenProps {
    'systemInfo': any,
    'navigation':any
}


export default class FireHoodQuestions extends React.Component<ScreenProps, ScreenState>{

    constructor(props: any) {
        super(props);
        this.state = {
            'burner': '',
            'model': '',
            'location': '',
        };

    }




    addFireHoodInfo = async () => {


        const systemInfo = this.props.systemInfo;
        const burner: string = this.state.burner;
        const model: string = this.state.model;
        const location: string = this.state.location;


        const systemInfoNew: any = [
            {'systemId':systemInfo[0].systemId},
            {'zoneId':systemInfo[1].zoneId},
            {'systemType':'fire-hood'},
            {'brand':systemInfo[3].brand},
            {'streetAddr':systemInfo[4].streetAddr},
            {'city':systemInfo[5].city},
            {'state':systemInfo[6].state},
            {'zipCode':systemInfo[7].zipCode},
            {'lat':systemInfo[8].lat},
            {'long':systemInfo[9].long},
            {'burner':burner},
            {'model':model},
            {'location':location}
        ];

        this.props.navigation.navigate('systemRegInfoPanelNav', {
            systemInfo:systemInfoNew
        });






    }



    render() {

        return (
            <View>
                <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>

                        <View style={styles.containerRowQuarter}>
                            <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../../assets/icons/burner-white.png')}/> Burners</Text>
                        </View>
                        <View style={styles.containerRowQuarter}>
                            <View style={styles.inputView}>
                                <TextInput style={styles.inputText}
                                    placeholder="Number of Burners..."
                                    placeholderTextColor="#969696"
                                    keyboardType="numeric"
                                    onChangeText={text => this.setState({ burner: text })}
                                />
                            </View>
                        </View>


                        <View style={styles.containerRowQuarter}>
                            <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../../assets/icons/floor-plan-white.png')}/> Location</Text>
                        </View>
                        <View style={styles.containerRowQuarter}>
                            <View style={styles.inputViewLg}>
                                <TextInput style={styles.inputText}
                                    placeholder="Location of System in Building..."
                                    placeholderTextColor="#969696"
                                    multiline={true}
                                    blurOnSubmit={false}
                                    numberOfLines={10}
                                    textAlignVertical="top"
                                    onChangeText={text => this.setState({ location: text })}
                                />
                            </View>
                        </View>


                        <View style={styles.containerRowQuarter}>
                            <Text style={styles.textLight}><Image style={styles.ImgMd} source={require('../../assets/icons/tag-white.png')}/> Model ID</Text>
                        </View>
                        <View style={styles.containerRowQuarter}>
                            <View style={styles.inputView}>
                                <TextInput style={styles.inputText}
                                    placeholder="Model ID.."
                                    autoCapitalize="none"
                                    placeholderTextColor="#969696"
                                    onChangeText={text => this.setState({ model: text })}
    
                                />
                            </View>
                        </View>
            

                        <View style={styles.containerRowBtn}>
                            <TouchableOpacity onPress={() => this.addFireHoodInfo()} style={styles.changeBtn}>
                                <Text style={styles.textLight}>Next <Image style={styles.ImgMd} source={require('../../assets/icons/inline-nextarrow-white.png')} /></Text>
                            </TouchableOpacity>
                        </View>





                    </ScrollView>
                </View>

            </View>
        );
    }
}

