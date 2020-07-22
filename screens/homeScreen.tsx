import * as React from 'react';
import { WebView } from 'react-native-webview';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

export default class App extends React.Component {

  constructor(props) {
    super(props)
}

  render() {
    const { navigation } = this.props;
    const link = navigation.getParam('link', "404");
    return(
     <WebView  ref={"webview"}
    originWhitelist={['*']}
    source={{ uri: link }}
    mixedContentMode={"always"}
    scalesPageToFit={true}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    automaticallyAdjustContentInsets={false}
    allowFileAccess={true}
    startInLoadingStage={true} style={{ marginTop: 20 }} />
    );
  }
}
