import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
         
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        marginHorizontal: 5,
        marginTop:120
    },

    containerTop: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 0.75,
        height: 140,
        marginTop:15
    },
    containerRow0: {
        flexDirection: 'row',
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    topBar: {
        flex: 1,
        height: 130,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    logoBox: {
        flex: 0.2,
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
        fontSize: 18,
        color: "white",
        textAlign: 'left'
    },
    textLight: {
         fontWeight: "400",
        fontSize: 20,
        color: "white",
        margin: 30,
        textAlign: 'auto'
    },
    textLightSm: {
         fontWeight: "400",
        fontSize: 16,
        color: "white",
        margin: 30,
        textAlign: 'auto'
    },
    textLightLg: {
         fontWeight: "400",
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
    ImgLg: {

        width: 35,
        height: 35,
        resizeMode: 'contain'
    }
})

//Dark:#212126
//Red:#ED1C24
//Yellow:#F7CE5B
//Blue:#1E96FC
//Green:#00A878

export default styles;