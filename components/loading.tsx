import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';



export default class LoadingIcon extends React.Component{
    render() {
        return (
          <View style={styles.container}>

          <ActivityIndicator size="large" />

          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        justifyContent: "center",
        alignContent:"center",
        height:"100%",
         
      },

    });
    
