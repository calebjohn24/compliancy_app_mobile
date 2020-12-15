import * as React from 'react';
import { WebView } from 'react-native-webview';
import styles from '../styles/reportWebview'
import { Text, View, Image, TouchableOpacity } from 'react-native';
import homePanel from './home'
import RootStack from '../App'

export default class reportWebviewPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            systemId: ""
        };
    }


    goToFindReports = (systemId: string) => {
        this.props.navigation.navigate('viewReportsNav', { systemId: systemId });
    }

    render() {
        const { navigation } = this.props;
        const link = navigation.getParam('link', '404');
        this.state.systemId = navigation.getParam('systemId', '');

        return (
            <>
                <View style={styles.containerTop}>
                <View style={styles.logoBox}>
                                <TouchableOpacity onPress={() => this.goToFindReports(this.state.systemId)}>

                                    <Image style={styles.tinyLogo} source={require('../assets/icons/back-arrow.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.topBar}>
                                <Text style={styles.dispNameText}>View Report</Text>
                            </View>
                </View>
                <WebView ref={"webview"}
                    originWhitelist={['*']}
                    source={{ uri: link }}
                    mixedContentMode={"always"}
                    scalesPageToFit={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    automaticallyAdjustContentInsets={false}
                    allowFileAccess={true}
                    startInLoadingStage={true} />

            </>

        );
    }
}