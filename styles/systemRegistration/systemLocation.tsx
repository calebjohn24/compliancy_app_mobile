import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({

    container: {
        marginTop:110,
        width:"100%",
        alignItems: 'center',
        justifyContent: 'center',
      },
      item:{
        padding:10,
        borderWidth:0,
        borderRadius:10,
        marginBottom:5,
        marginTop:5,
        height:75,
        backgroundColor:"#313337",
        flex:1,
    },
    scrollView: {
        marginHorizontal: 10,
        marginBottom:75
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

    logoBox: {
        flex: 0.15,
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
        marginVertical:5,
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
        fontSize: 20,
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
    },
    inputView: {
        width: "95%",
        backgroundColor: "#4d4d54",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 30,
        color: "white"
    },
    containerRowQuarter: {
        flexDirection: 'row',
        flex: 1,
        marginVertical:10,
        alignItems: 'center',
        justifyContent: 'center',


    },
    containerRowBtn: {
        flexDirection: 'row',
        flex: 1,
        marginTop:20,
        marginBottom:150,
        alignItems: 'center',
        justifyContent: 'center',


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