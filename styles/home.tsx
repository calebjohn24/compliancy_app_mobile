import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
       
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


  export default styles;