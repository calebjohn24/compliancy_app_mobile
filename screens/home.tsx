import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as SecureStore from 'expo-secure-store';
import infoPanel from './info'
import RootStack from '../App'
import styles from '../styles/home'
import LoadingIcon from '../components/loading'



interface ScreenState {
  'logo': string,
  'dispName': string,
  'spinner':boolean
};

interface ScreenProps {
  navigation: any
}


export default class homePanel extends React.Component <ScreenProps, ScreenState>{

  constructor(props: any) {
    super(props);
    this.state = {
      'logo': 'https://firebasestorage.googleapis.com/v0/b/compliancy-app.appspot.com/o/Logo_text_no_bg.png?alt=media&token=2982a122-243e-447b-a552-0b1f63e07921',
      'dispName': '',
      'spinner':true,
    };

  }



  componentDidMount = async () => {

    try {


      let compId = await SecureStore.getItemAsync('compId');
      let token = await SecureStore.getItemAsync('token');
      let userId = await SecureStore.getItemAsync('id');

      return fetch('https://365a6631f36d.ngrok.io/api/homepage-info', {
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
             () => {
              this.setState({
                logo:responseJson.logo,
                dispName: responseJson.dispName
              })
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

  goToInfo = () => {
    this.props.navigation.navigate('InfoNav');
  }

  goToFindSystems = () => {
    this.props.navigation.navigate('viewSystemPanelsNav');
  }

  goToRegSystems = () => {
    this.props.navigation.navigate('systemRegStartPanelNav');
  }

  render() {
    const logo = this.state.logo;



    return (
      <>
      {this.state.spinner ? <LoadingIcon/>:
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
            <TouchableOpacity onPress={this.goToRegSystems}>
              <Text style={styles.buttonText}>Register System</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.goToRegSystems}>
              <Image style={styles.buttonImgLg} source={require('../assets/icons/system-add.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowButton1}>
            <TouchableOpacity onPress={this.goToFindSystems}>
              <Text style={styles.buttonText}>Find System</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.goToFindSystems}>
              <Image style={styles.buttonImgLg} source={require('../assets/icons/system-search.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerRow0}>
          <View style={styles.rowButton}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('viewAmendsPanelNav')}>
              <Text style={styles.buttonText}>Amend Report</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('viewAmendsPanelNav')}>
              <Image style={styles.buttonImgLg} source={require('../assets/icons/report-amend.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    }
      </>
        
    );
  }
}

