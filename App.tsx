import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';


import homePanel from './screens/home'
import loginScreen from './screens/login'
import infoPanel from './screens/info'
import certificatesPanel from './screens/certificates'
import editInfoPanel from './screens/editInfo'
import viewSystemPanel from './screens/viewSystems'
import systemInfoPanel from './screens/systemInfo'
import viewReportsPanel from './screens/viewReports'
import reportWebviewPanel from './screens/reportWebview'

import systemRegStartPanel from './screens/systemRegistration/start';
import systemRegSystemTypePanel from './screens/systemRegistration/systemType'
import systemRegBrandPanel from './screens/systemRegistration/brand'
import systemRegLocationPanel from './screens/systemRegistration/systemLocation'
import systemRegCustomInfoPanel from './screens/systemRegistration/customInfo'
import systemRegInfoPanel from './screens/systemRegistration/systemInfo'
import systemRegDiagramUploadPanel from './screens/systemRegistration/uploadDiagram'
import systemRegDiagramPreviewPanel from './screens/systemRegistration/previewDiagram'
import systemPreviewPanel from './screens/systemRegistration/previewSystem'

import systemInspectListFormsPanel from './screens/systemInspection/selectForm'
import systemInspectQuestionPanel from './screens/systemInspection/formQuestion'



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


      return fetch('https://cd940c5a21e2.ngrok.io/api/check_user_token', {
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
      .catch(() => {
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


const RootStack = createStackNavigator({
  InfoNav: {
    screen: infoPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  HomeNav: {
    screen: homePanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  LoginNav: {
    screen: loginScreen,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    },
  },
  CertificateNav: {
    screen: certificatesPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  EditInfoNav: {
    screen: editInfoPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  viewSystemPanelsNav: {
    screen: viewSystemPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  SystemInfoNav: {
    screen: systemInfoPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  viewReportsNav: {
    screen: viewReportsPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  reportWebviewPanelNav: {
    screen: reportWebviewPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  systemRegStartPanelNav: {
    screen: systemRegStartPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  systemRegSystemTypePanelNav:{
    screen: systemRegSystemTypePanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  systemRegBrandPanelNav:{
    screen: systemRegBrandPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  systemRegLocationPanelNav:{
    screen: systemRegLocationPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  systemRegCustomInfoPanelNav:{
    screen: systemRegCustomInfoPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  systemRegInfoPanelNav:{
    screen: systemRegInfoPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  systemRegDiagramUploadPanelNav:{
    screen:systemRegDiagramUploadPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  systemRegDiagramPreviewPanelNav:{
    screen:systemRegDiagramPreviewPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  systemPreviewPanelNav:{
    screen:systemPreviewPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  systemInspectListFormsPanelNav:{
    screen:systemInspectListFormsPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  systemInspectQuestionPanelNav:{
    screen:systemInspectQuestionPanel,
    navigationOptions: {
      headerShown: false, 
      cardStyle: { backgroundColor: '#242424' }
    }
  },
  auth: {
    screen: authScreen,
    navigationOptions: {
      headerShown: false, 
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