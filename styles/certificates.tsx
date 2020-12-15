import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    mainList: {
        flexGrow: 1
       },
    container: {
        flex: 1,
         
        alignItems: 'center',
        justifyContent: 'center',
    },
    List: {
        marginTop:120,
        marginBottom:40,
        flexGrow: 1,
         
        
        
    },
    scrollView: {
        marginHorizontal: 1,
        marginVertical: 10,
    },
    containerRow0: {
        flexDirection: 'row',
        height: 80,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    containerRowImg: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        

    },
    RowDiv: {
        height: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    containerRowList: {
        flex:1,
        
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    topBar: {
        flex: 1,
        height: 120,
        justifyContent: 'center',
        alignItems: 'flex-start',
        
        
    },
    containerTop: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
        height: 120,
        marginTop:15
    },
    logoBox: {
        flex: 0.22,
        height: 120,
        justifyContent: 'center',
        alignItems: 'flex-start'
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
        resizeMode: 'contain',
    },

    rowText: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        height: 90,

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
    }
})

//Dark:#212126
//Red:#ED1C24
//Yellow:#F7CE5B
//Blue:#1E96FC
//Green:#00A878

export default styles;
