import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 20,
        padding:10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      item:{
        padding:10,
        borderWidth:0,
        borderRadius:10,
        marginBottom:5,
        marginTop:5,
        height:255,
        backgroundColor:"#313337",
        flex:1,
    },
    scrollView: {
        marginHorizontal: 5,
        marginTop:120
    },

    containerTop: {
        marginTop:15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 0.75,
        height: 120
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

    logoBox: {
        flex: 0.4,
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
    List: {
        marginTop:120,
        marginBottom:40,
        flexGrow: 1,
         
        marginHorizontal:20
        
        
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
        fontSize: 18,
        color: "white",
        textAlign: 'left'
    },
    textLight: {
         fontWeight: "400",
        fontSize: 18,
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

        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    ImgMd: {

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