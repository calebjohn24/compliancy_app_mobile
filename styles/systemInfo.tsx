import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    scrollView: {
        marginHorizontal: 5,
        marginTop:120,
        marginBottom:50
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 1,
        marginLeft:10
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
        flex: 0.25,
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
        margin: 10,
        textAlign: 'left'
    },
    textLight: {
         fontWeight: "400",
        fontSize: 20,
        color: "white",
        margin: 25,
        textAlign: 'auto'
    },
    textLightSm: {
         fontWeight: "400",
        fontSize: 18,
        margin: 25,
        color: "white",
        textAlign: 'auto'
    },
    textLightLg: {
         fontWeight: "400",
        fontSize: 24,
        color: "white",
        margin: 25,
        textAlign: 'auto'
    },
    buttonText: {
        fontWeight: "100",
        fontSize: 16,
        marginRight:25,
        marginBottom:30,
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

        width: 32,
        height: 32,
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
    }
})

//Dark:#212126
//Red:#ED1C24
//Yellow:#F7CE5B
//Blue:#1E96FC
//Green:#00A878

export default styles;