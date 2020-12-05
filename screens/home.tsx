import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as SecureStore from 'expo-secure-store';
import infoPanel from './info'
import RootStack from '../App'

export default class homePanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'logo': 'https://firebasestorage.googleapis.com/v0/b/compliancy-app.appspot.com/o/Logo_text_no_bg.png?alt=media&token=2982a122-243e-447b-a552-0b1f63e07921',
      'dispName': ''
    };

  }



  componentDidMount = async () => {

    try {


      let compId = await SecureStore.getItemAsync('compId');
      let token = await SecureStore.getItemAsync('token');
      let userId = await SecureStore.getItemAsync('id');

      return fetch('https://a317d66e1ed7.ngrok.io/api/homepage-info', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          compId: compId,
          userId: userId,
          token:token

        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              logo: responseJson.logo,
              dispName: responseJson.dispName
            },
            function () {
              this.state.logo = responseJson.logo
              this.state.dispName = responseJson.dispName
            }
          );
        })
        .catch(error => {
          alert("Cannot Reach Server")
        });




    } catch (error) {
      console.log(error)
      alert("Cannot Reach Server")
    }
  }

  goToInfo = () => {
    this.props.navigation.navigate('InfoNav');
  }

  render() {
    const logo = this.state.logo;



    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <View style={styles.topBar}>
          <TouchableOpacity onPress={this.goToInfo}>
            <Text style={styles.dispNameText}>{this.state.dispName}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.logoBox}>
            <TouchableOpacity onPress={this.goToInfo}>

              <Image style={styles.tinyLogo} source={{ uri: logo }} />
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.containerRow0}>
          <View style={styles.rowButton}>
            <TouchableOpacity onPress={() => alert("test")}>
              <Text style={styles.buttonText}>Register System</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert("test")}>
              <Image style={styles.buttonImgLg} source={require('../assets/icons/system-add.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowButton1}>
            <TouchableOpacity onPress={() => alert("test")}>
              <Text style={styles.buttonText}>Find System</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert("test")}>
              <Image style={styles.buttonImgLg} source={require('../assets/icons/system-search.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerRow0}>
          <View style={styles.rowButton}>
            <TouchableOpacity onPress={() => alert("test")}>
              <Text style={styles.buttonText}>New Report</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert("test")}>
              <Image style={styles.buttonImgLg} source={require('../assets/icons/report-add.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowButton1}>
            <TouchableOpacity onPress={() => alert("test")}>
              <Text style={styles.buttonText}>Find Report</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert("test")}>
              <Image style={styles.buttonImgLg} source={require('../assets/icons/report-search.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerRow0}>
          <View style={styles.rowButton}>
            <TouchableOpacity onPress={() => alert("test")}>
              <Text style={styles.buttonText}>Amend Report</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert("test")}>
              <Image style={styles.buttonImgLg} source={require('../assets/icons/report-amend.png')} />
            </TouchableOpacity>
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
    height: 140
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
  buttonImgLg: {
    margin: 20,
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  buttonImgSm: {
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

