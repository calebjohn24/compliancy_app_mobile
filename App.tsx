import 'react-native-gesture-handler';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';


import homePanel from './screens/home'
import loginScreen from './screens/login'
import infoPanel from './screens/info'
import certificatesPanel from './screens/certificates'
import editInfoPanel from './screens/editInfo'
import viewSystemPanel from './screens/viewSystems'
import systemInfoPanel from './screens/systemInfo'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingIcon from './components/loading'

class authScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true ,
      'auth':'',
      'token':''
    };
  
  }
  
  componentDidMount = async () => {



    try {

      let token = await SecureStore.getItemAsync('token');
      let id = await SecureStore.getItemAsync('id');

      //var id = SecureStore.getItemAsync('id');
      //var token = SecureStore.getItemAsync('token');
      if(token == null){

        this.props.navigation.navigate('LoginNav');

      }
      
      else{


      return fetch('https://1ab18b31c7bb.ngrok.io/api/check_user_token', {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         id: id,
         token: token,

       }),
   })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            auth: responseJson.auth,
            token: responseJson.token
          },
          function() {
            if(responseJson.auth == true){
              this.props.navigation.navigate('HomeNav');
              SecureStore.setItemAsync('id', responseJson.userId)
              SecureStore.setItemAsync('token', responseJson.token)
              SecureStore.setItemAsync('compId', responseJson.compId)
              
            }
            else{
              this.props.navigation.navigate('LoginNav');

            }
          }
        );
      })
      .catch(error => {
        this.props.navigation.navigate('LoginNav');
      });


    }
      
    } catch (error) {
  console.log(error)
  this.props.navigation.navigate('LoginNav');
    }
  }


  render() {
    if (this.state.isLoading) {
      return (

          <LoadingIcon />
      
      );
    }

    return (
  

      <View style={{ flex: 1, paddingTop: 20 }}>
      </View>
  
  );
  }
}

const MyTheme = {
  dark: true,
  colors: {
    background: 'rgb(0, 0, 0)',

  },
};

const RootStack = createStackNavigator({
  InfoNav: {
    screen: infoPanel,
    navigationOptions: {
      headerShown: false,//this will hide the header
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  HomeNav: {
    screen: homePanel,
    navigationOptions: {
      headerShown: false,//this will hide the header
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  LoginNav: {
    screen: loginScreen,
    navigationOptions: {
      headerShown: false,//this will hide the header
      cardStyle: { backgroundColor: '#242424' }
    },
  },
  CertificateNav: {
    screen: certificatesPanel,
    navigationOptions: {
      headerShown: false,//this will hide the header
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  EditInfoNav: {
    screen: editInfoPanel,
    navigationOptions: {
      headerShown: false,//this will hide the header
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  viewSystemPanelsNav: {
    screen: viewSystemPanel,
    navigationOptions: {
      headerShown: false,//this will hide the header
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  SystemInfoNav: {
    screen: systemInfoPanel,
    navigationOptions: {
      headerShown: false,//this will hide the header
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  auth: {
    screen: authScreen,
    navigationOptions: {
      headerShown: false,//this will hide the header
      cardStyle: { backgroundColor: '#242424' }
    }
  }
}, {
    initialRouteName: 'auth',
});



export default createAppContainer(RootStack);




//Dark:#212126
//Red:#ED1C24
//Yellow:#F7CE5B
//Blue:#1E96FC
//Green:#00A878