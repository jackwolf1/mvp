import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import {
    NativeModules, DeviceEventEmitter, ToastAndroid,
    ScrollView, Alert, View, Image, Text, TextInput,
    TouchableOpacity, FlatList, Dimensions, StyleSheet,
    TouchableHighlight, SafeAreaView, Button
} from 'react-native';
import NavigationItem from "../../widget/NavigationItem";
import { ToobBar } from "../../components/Text";
import Modal from 'antd-mobile/lib/modal';
import ibmsStore from "../../stores/ImbsStore";
import storage from '../../service/LocationService'
import PicSelect from '../../components/pictureselect/PicSelect';
import { StackNavigator } from 'react-navigation';
import AutoUtil from "../../utils/AutoUtil";
import color from "../../widget/color";

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

@observer
export default class DealwithOrder extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <View style={styles.toolBar}>
                <ToobBar style={styles.searchBar}>处理工单</ToobBar>
            </View>
        ),
        headerLeft: (
            <NavigationItem
                iconStyle={styles.iconStyle}
                icon={require('../../images/ic_title_bar_left.png')}
                title={'返回'}
                onPress={() => {
                    navigation.goBack();
                }}
            />
        ),
        headerRight: (
            <NavigationItem
                onPress={() => {
                    //点击
                }}
            />
        ),
        headerStyle: {
            // height: AutoUtil.getHeight(48),
            backgroundColor: '#ffffff'
        },
    });
    componentWillMount() {
        // storage.save({
        //     key: 'loginState',
        //     data: {
        //         token: NativeModules.ExampleInterface1.token,
        //         chient: NativeModules.ExampleInterface1.chient,
        //         edition: NativeModules.ExampleInterface1.edition
        //     },
        //     expires: null
        // });
        // //测试事件
        // DeviceEventEmitter.addListener('AndroidToRNMessage', (a) => {
        //     ToastAndroid.show("发送成功", ToastAndroid.SHORT);
        // });
    }
    /**
     * 测试，调用Native页面
     */
    // pressSelectContract() {

    //     NativeModules.ExampleInterface1.handleMessage("I press button.");
    // }
    /**
     * 测试Callback
     */
    // pressCallback() {
    //     NativeModules.ExampleInterface1.handleCallback('i will be print', (msg) => {
    //         console.log(msg);
    //     });
    // }

    /**
     * 测试Promise
     */
    // pressPromise() {
    //     NativeModules.ExampleInterface1.handlePromise('Promise').then((msg) => {
    //         console.log(msg)
    //     })
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // }

    // componentWillUnmount() {
    //     DeviceEventEmitter.removeAllListeners();
    // }
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }

    }
    //确定弹窗
    submitAlert() {
        if (!(this.state.content === "")) {
            Modal.alert('提交完成记录？', '', [
                { text: '取消', style: { color: 'rgb(252,38,41)' } },
                { text: '提交', onPress: () => this.submit() },
            ])
        }
    }


    //提交
    submit = () => {
        ibmsStore.uploadImage(this.setDealwithOrder);

    }
    //上传处理工单
    setDealwithOrder = (pic) => {
        //获取传递过来的信息
        const { params } = this.props.navigation.state;
        const orderId = params ? params.orderId : null;
        let data = {
            orderId: orderId,
            name: "",
            pic: pic,
            content: this.state.content
        };

        ibmsStore.setDealwithOrder(data).then(data => {
            Alert.alert("处理工单成功")
        }).catch(err => {
            Alert.alert(JSON.stringify(err))
        })
    }

    //显示提交按钮
    showSubmitText = () => {
        if (this.state.content === "") {
            return (<Text
                style={styles.submitDisableTextStyle}>提交</Text>)
        } else {
            return <Text
                style={styles.submitTextStyle}>提交</Text>
        }

    }
    //设置上传的图片内容
    handlePicList = (list) => {
        ibmsStore.uploadpicList = list
    }

    render() {

        return (
            <SafeAreaView style={styles.contentStyle}>
                <ScrollView style={styles.scrollStyle}>
                    <View style={styles.textInputViewStyle}>
                        <TextInput
                            placeholder='填写内容'
                            underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果  
                            style={styles.textInputStyle}
                            multiline={true}
                            onChangeText={(text) => this.setState({ content: text })}
                            value={this.state.content}
                        />
                    </View>
                    <PicSelect handlePicList={this.handlePicList}></PicSelect>
                </ScrollView>
                <TouchableHighlight
                    underlayColor='#dddddd'
                    style={styles.submitStyle}
                    onPress={() => this.submitAlert()}>
                    <View>
                        {this.showSubmitText()}</View>
                </TouchableHighlight>
            </SafeAreaView>


        );
    }


}
const styles = StyleSheet.create({
    contentStyle: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    scrollStyle: {
        flex: 1,
        backgroundColor: color.bg
    },

    textInputViewStyle: {
        backgroundColor: '#ffffff',
        padding: 16,
        width: WIDTH,
        height: 200,
        justifyContent: 'flex-start',
    },
    textInputStyle: {

    },

    submitStyle: {

        backgroundColor: '#ffffff',
        alignItems: 'center',
        width: WIDTH,
        height: 48,
        justifyContent: 'center',

    },
    submitTextStyle: {
        color: '#5a95e0'
    },
    submitDisableTextStyle: {
        color: '#aaaaaa'
    }, toolBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: '#000000',
    },
    iconStyle: {
        width: AutoUtil.getWidth(9),
        height: AutoUtil.getHeight(16),
        marginLeft: AutoUtil.getWidth(16),
    },

})
// StackNavigator({
//     Home: {
//         screen: DealwithOrder,
//     },
// },
//     {
//         initialRouteName: 'Home',
//         navigationOptions: {
//             headerStyle: {
//                 backgroundColor: '#ffffff',
//             },
//             headerTintColor: '#000000',
//             headerTitleStyle: {
//                 fontWeight: 'bold',
//             },
//         },
//     });