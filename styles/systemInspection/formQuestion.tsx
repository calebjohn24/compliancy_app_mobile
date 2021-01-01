import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 20,
        padding:10,
        alignItems: 'center',
        justifyContent: 'center',
      },
    scrollView: {
        marginHorizontal: 5,
        marginTop:120,
        marginBottom:50
        
    },

    containerTop: {
        marginTop:15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 0.75,
        height: 140
    },
    containerItem: {
        
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    topBar: {
        flex: 1,
        height: 120,
        justifyContent: 'center',
        alignItems: 'flex-start',
        
        
    },
    containerQuestion: {
        height: "auto",
        marginTop:10,
        marginBottom:30,
        marginHorizontal:10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logoBox: {
        flex: 0.35,
        height: 120,
        justifyContent: 'center',
        alignItems: 'flex-start',
         
    },
    buttonSmBox: {
        flex: 0.25,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dispNameText: {
        fontWeight: "bold",
        fontSize: 26,
        color: "white",
        margin: 30,
        textAlign: 'center'
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 22,
        color: "white",
    },
    textLight: {
         fontWeight: "400",
        fontSize: 14,
        marginTop:15,
        color: "white",
        textAlign: 'auto'
    },
    textLightSm: {
         fontWeight: "400",
        fontSize: 16,
        color: "white",
        textAlign: 'auto'
    },
    textLightLg: {
         fontWeight: "400",
        fontSize: 22,
        color: "white",
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
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginHorizontal:30
    },
    ImgMd: {

        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    maxImg: {
        marginHorizontal:10,
        width: "auto",
        height: 400,
        resizeMode: 'contain'
    },
    preview: {
        height: 500,
        width: '95%',
        alignContent:'center',
        justifyContent:'center',
        bottom:20
    },
    containerRowQuarter: {
        flexDirection: 'row',
        flex: 1,
        marginVertical:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

//Dark:#212126
//Red:#ED1C24
//Yellow:#F7CE5B
//Blue:#1E96FC
//Green:#00A878
//Gray:#bfbfbf
//Teal:#64cad1
export default styles;