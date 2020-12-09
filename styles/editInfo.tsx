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
        height: 150,

    },
    containerRow0: {
        flexDirection: 'row',
        height: 80,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    containerRowHalf: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',


    },
    containerRowQuarter: {
        flexDirection: 'row',
        flex: 0.35,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',


    },
    containerRowImg: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',


    },
    inputView: {
        width: "80%",
        backgroundColor: "#4d4d54",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    RowDiv: {
        height: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    containerRowList: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    containerButton: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',

    },
    topBar: {
        flex: 1,
        height: 145,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    logoBox: {
        flex: 0.3,
        height: 150,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    buttonSmBox: {
        flex: 0.25,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonMdBox: {
        flex: 0.35,
        height: 80,
        justifyContent: 'center',
        alignItems: 'baseline',
    },
    maxImgBox: {
        justifyContent: 'flex-start',
        alignItems: 'center'

    },
    maxImg: {
        margin: 0,
        width: 300,
        height: 300,
        resizeMode: 'contain'
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
        fontSize: 22,
        color: "white",
        textAlign: 'center'
    },
    textLight: {
        fontWeight: "200",
        fontSize: 20,
        color: "white",
        margin: 30,
        textAlign: 'auto'
    },
    textLightSm: {
        fontWeight: "200",
        fontSize: 16,
        color: "white",
        margin: 30,
        textAlign: 'auto'
    },
    textLightLg: {
        fontWeight: "200",
        fontSize: 22,
        color: "white",
        margin: 30,
        textAlign: 'auto'
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

    rowText: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        height: 80,

    },
    rowButton: {
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

        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
    buttonImgMd: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    ImgLg: {

        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
    changeBtn: {
        width: "50%",
        backgroundColor: "#00A878",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
})

//Dark:#212126
//Red:#ED1C24
//Yellow:#F7CE5B
//Blue:#1E96FC
//Green:#00A878


export default styles;