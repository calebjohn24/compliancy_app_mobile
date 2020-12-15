import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as SecureStore from 'expo-secure-store';
import homePanel from './home'
import RootStack from '../App'
import styles from '../styles/login'

export default class loginScreen extends React.Component {

      constructor(props) {
        super(props);
        this.state = { 
          isLoading: true ,
          'auth':false,
          'token':'',
          'email':'',
        'password':''
        };
      
      }

      check_cred = () => {
          return fetch('https://1ab18b31c7bb.ngrok.io/api/new_user_token', {
            method: 'POST',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({
               email: this.state.email,
               pw: this.state.password,
             }),
         })
            .then(response => response.json())
            .then(responseJson => {
              this.setState(
                {
                  isLoading: false,
                  auth: responseJson.auth,
                  userId: responseJson.userId,
                  token: responseJson.token,
                  compId: responseJson.compId
                },
                function() {
                  if(responseJson.auth == true){
                    SecureStore.setItemAsync('id', responseJson.userId)
                    SecureStore.setItemAsync('token', responseJson.token)
                    SecureStore.setItemAsync('compId', responseJson.compId)
                    this.props.navigation.navigate('HomeNav');
                  }
                  else{
                    alert('Incorrect Email or Password')
      
                  }
                }
              );
            })
            .catch(error => {
              console.error(error);
              alert(error);
            });
      }


  render(){
    return (
      <View style={styles.container}>
         <Text style={styles.logo}>Login</Text>
        <View style={styles.inputView}>
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#FFFFFF"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#FFFFFF"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.check_cred} style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>


    );
  }
}





