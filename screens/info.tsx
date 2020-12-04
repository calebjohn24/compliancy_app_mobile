import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as SecureStore from 'expo-secure-store';
import homePanel from './home'
import RootStack from '../App'

export default class infoPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          'logo': null,
          'dispName': ''
        };
    
      }
    
    
      componentDidMount = async () => {
        console.log("info Screen")
      }

      goToHome = () => {

        console.log("go back");
        this.props.navigation.navigate('HomeNav');
      }
    
      render() {
    
        return (
          <View style={styles.container}>

            <View style={styles.containerTop}>
                    <View style={styles.topBar}>
                    <TouchableOpacity onPress={this.goToHome}><Text style={styles.dispNameText}>Go Back</Text></TouchableOpacity>
                    </View>            
                </View>
            
           
          
          
          </View>
        );
      }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#212126',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerTop: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flex: 0.75,
      height:140
    },
    containerRow0: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      
      flex: 1
    },
    topBar: {
      flex: 1,
      height: 120,
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
    },
  
    logoBox: {
      flex: 0.3,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center'
    },
    dispNameText: {
      fontWeight: "bold",
      fontSize: 28,
      color: "white",
      margin: 30,
      textAlign: 'left'
    },
    buttonText: {
      fontWeight: "100",
      fontSize: 20,
      color: "white",
      textAlign: 'center'
    },
    tinyLogo: {
      margin: 20,
      width: 50,
      height: 50,
      resizeMode: 'contain'
    },
    
    rowButton: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
  
    },
    rowButton1: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    buttonImgLg:{
      margin: 20,
      width: 80,
      height: 80,
      resizeMode: 'contain'
    },
    buttonImgSm:{
      margin: 20,
      width: 20,
      height: 20,
      resizeMode: 'contain'
    }
  })
  
  //Dark:#212126
  //Red:#ED1C24
  //Yellow:#F7CE5B
  //Blue:#1E96FC
  //Green:#00A878
  




