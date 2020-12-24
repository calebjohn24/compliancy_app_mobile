import {StyleSheet, Dimensions} from 'react-native';
const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({

    container: {
        marginTop:80,
        width:"100%",
        alignItems: 'center',
        justifyContent: 'center'
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
        width: 90,
        height: 90,
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
        marginHorizontal:70
    },
    ImgMd: {

        width: 20,
        height: 20,
        resizeMode: 'contain'
    },

    ImgPreview: {
        width: "90%",
        height: "90%",
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
    inputViewLg: {
        width: "95%",
        backgroundColor: "#4d4d54",
        borderRadius: 20,
        margin: 10,
        height:90,
        justifyContent: "flex-start",
        paddingVertical:12,
        paddingHorizontal:15,
        borderBottomWidth: 1,

    },
    inputText: {
        height: 70,
        color: "white"
    },
    containerRowQuarter: {
        flexDirection: 'row',
        flex: 1,
        marginVertical:15,
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
    preview: {
        height: '90%',
        width: '95%',
        borderRadius:15,
        alignContent:'center',
        justifyContent:'center',
        bottom:20
    },
})

//Dark:#212126
//Red:#ED1C24
//Yellow:#F7CE5B
//Blue:#1E96FC
//Green:#00A878

export default styles;