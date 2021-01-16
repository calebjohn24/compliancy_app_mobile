import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    containerBottom: {
        marginTop: 10,
        padding: 10,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    greenButton: {
        borderRadius: 10,
        marginHorizontal: 20,
        borderWidth: 5,
        marginVertical: 30,
        height: 'auto',
        width: '70%',
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        borderColor: '#00A878'
    },
    redButton: {
        borderRadius: 10,
        marginVertical: 30,
        borderWidth: 4,
        height: 'auto',
        width: '70%',
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        borderColor: '#ED1C24'
    },
    scrollView: {
        marginHorizontal: 5,
        marginTop: 110,
        marginBottom: 50,

    },

    containerTop: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 0.75,
        height: 140,
        marginTop: 15
    },
    containerRow0: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        marginBottom: 50,
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
    topBar: {
        flex: 1,
        height: 130,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    logoBox: {
        flex: 0.32,
        height: 130,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    buttonSmBox: {
        flex: 0.25,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dispNameText: {
        fontWeight: "bold",
        fontSize: 24,
        color: "white",
        margin: 30,
        textAlign: 'center'
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
        marginVertical: 15,
        marginHorizontal: 25,
        textAlign: 'center'
    },
    textLight: {
        fontWeight: "300",
        fontSize: 20,
        color: "white",
        marginBottom: 30,
        marginHorizontal: 15,
        textAlign: 'left'

    },
    textLightSm: {
        fontWeight: "400",
        fontSize: 18,
        marginVertical: 25,
        marginHorizontal: 25,
        color: "white",
        textAlign: 'auto'
    },
    textLightLg: {
        fontWeight: "400",
        fontSize: 22,
        color: "white",
        marginVertical: 30,
        marginHorizontal: 10,
        textAlign: 'auto'
    },
    buttonText: {
        fontWeight: "100",
        fontSize: 16,
        marginRight: 25,
        marginBottom: 30,
        color: "white",
        textAlign: 'center'
    },
    tinyLogo: {
        margin: 20,
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },

    rowText: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        height: 80,

    },
    buttonImgLg: {
        margin: 20,
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    buttonImgSm: {

        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
    ImgLg: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    ImgMd: {

        width: 28,
        height: 28,
        resizeMode: 'contain'
    },
    ImgSm: {
        width: 22,
        height: 22,
        resizeMode: 'contain'
    },
    maxImg: {
        marginHorizontal: 10,
        width: "95%",
        height: 400,
        resizeMode: 'contain'
    }
})

//Dark:#212126
//Red:#ED1C24
//Yellow:#F7CE5B
//Blue:#1E96FC
//Green:#00A878

export default styles;