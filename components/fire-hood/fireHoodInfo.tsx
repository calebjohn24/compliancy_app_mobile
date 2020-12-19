import React, { Component } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image,
    TouchableOpacity
} from "react-native";

export default class FireHoodModal extends Component {
    state = {
        modalVisible: false
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }



    render() {
        const systemInfo = this.props.systemInfo;
        const { modalVisible } = this.state;
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.textLightSm}>Burner <Image style={styles.ImgSm} source={require('../../assets/icons/burner-white.png')} />:  <Text style={styles.textLight}>{systemInfo.burner}</Text></Text>
                            <Text style={styles.textLightSm}>Location <Image style={styles.ImgSm} source={require('../../assets/icons/floor-plan-white.png')} />:  <Text style={styles.textLight}>{systemInfo.location}</Text></Text>
                            <TouchableHighlight
                            style={{backgroundColor:"#00A878", borderRadius:10, marginTop:25}}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textLightSm}>Done</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text style={styles.textLightModal}><Image style={styles.ImgMd} source={require('../../assets/icons/gear-white.png')} /> {systemInfo.type}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        margin: 20,
        backgroundColor: "black",
        borderRadius: 20,
        padding: 20,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: "90%",
        marginBottom: 20
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    ImgMd: {

        width: 28,
        height: 28,
        resizeMode: 'contain'
    }, 
    textLight: {
        fontWeight: "400",
       fontSize: 20,
       color: "white",
       margin: 10,
       textAlign: 'auto'
   },
   textLightSm: {
        fontWeight: "400",
       fontSize: 18,
       margin: 8,
       color: "white",
       textAlign: 'auto'
   },
   textLightLg: {
        fontWeight: "400",
       fontSize: 24,
       color: "white",
       margin: 10,
       textAlign: 'auto'
   },
   textLightModal: {
    fontWeight: "400",
   fontSize: 24,
   color: "white",
   margin: 25,
   textAlign: 'auto'
},
    ImgSm: {
        width: 22,
        height: 22,
        resizeMode: 'contain'
    }
});

