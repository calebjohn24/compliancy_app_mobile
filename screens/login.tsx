import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as SecureStore from 'expo-secure-store';
import homeScreen from './homeScreen'

class loginScreen extends React.Component {

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
          return fetch('https://177aff193c7f.ngrok.io/new_user_token', {
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
                  token: responseJson.token
                },
                function() {
                  if(responseJson.auth == true){
                    alert(responseJson.link)
                    SecureStore.setItemAsync('id', responseJson.userId)
                    SecureStore.setItemAsync('token', responseJson.token)
                    this.props.navigation.navigate('Home', {link: responseJson.link});
                  }
                  else{
                    alert('Incorrect Email or Password')
      
                  }
                }
              );
            })
            .catch(error => {
              console.error(error);
            });
      }


  render(){
    return (
      <View style={styles.container}>
         <Text style={styles.logo}>Sentinel Fire Watch</Text>
        <View style={styles.inputView}>
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
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


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#003f5c',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#fb5b5a",
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:"#465881",
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:"white"
    },
    forgot:{
      color:"white",
      fontSize:11
    },
    loginBtn:{
      width:"80%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"white"
    }
  });


  

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
    }
  }, {
      initialRouteName: 'login',
  });
  
  export default createAppContainer(RootStack);