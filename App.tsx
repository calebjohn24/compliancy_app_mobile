import 'react-native-gesture-handler';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import homeScreen from './screens/homeScreen'
import loginScreen from './screens/login'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

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

        this.props.navigation.navigate('login');

      }
      
      else{


      return fetch('https://177aff193c7f.ngrok.io/check_user_token', {
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

              var link = 'https://177aff193c7f.ngrok.io/user_panel_start/'+id+'/'+token
              this.props.navigation.navigate('Home', {link: link});
              
            }
            else{
              this.props.navigation.navigate('login');

            }
          }
        );
      })
      .catch(error => {
        this.props.navigation.navigate('login');
      });


    }
      
    } catch (error) {
  console.log(error)
  this.props.navigation.navigate('login');
    }
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
  

      <View style={{ flex: 1, paddingTop: 20 }}>
      </View>
  
  );
  }
}


const RootStack = createStackNavigator({
  Home: {
    screen: homeScreen,
    navigationOptions: {
      headerShown: null //this will hide the header
    }
  },
  login: {
    screen: loginScreen,
    navigationOptions: {
      headerShown: null //this will hide the header
    }
  },
  auth: {
    screen: authScreen,
    navigationOptions: {
      headerShown: null //this will hide the header
    }
  }
}, {
    initialRouteName: 'auth',
});

export default createAppContainer(RootStack);