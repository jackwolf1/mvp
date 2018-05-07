import React, { Component, PropTypes } from "react";
import { StackNavigator } from 'react-navigation';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    AppRegistry,
    StyleSheet,
    NativeModules,
    NativeAppEventEmitter
} from 'react-native';
import { chient, edition, token } from './configs/config';
import { observer, inject } from "mobx-react";
import './service/LocationService';
import ibmsStore from "./stores/ImbsStore";

import NoticeBar from 'antd-mobile/lib/notice-bar';
import WhiteSpace from 'antd-mobile/lib/white-space';
import Banner from './layouts/Application/Banner';
import AppItem from './layouts/Application/itemList';
//页面注册
import IbmsCompany from './layouts/ibms/IBMSCompanyList';
import IbmsApp from './layouts/ibms/IBMSAppList';
import IbmsControl from './layouts/ibms/IBMSControlList';
import IbmsNoticeDetail from './layouts/ibms/IBMSAlarmNoticeDetail';

import AutoUtil from "./utils/AutoUtil";
import AlarmNotificationList from "./layouts/ibms/AlarmNotificationList";
import WorkOrderProcessing from "./layouts/ibms/WorkOrderProcessing";
import IBMSWorkOrderDel from "./layouts/ibms/IBMSWorkOrderDetail";
import DealwithOrder from "./layouts/ibms/IBMSDealwithOrder";

// var RNCalliOSAction = NativeModules.TFRNCalliOSAction;

@observer
class App extends Component {
    //集成后将该导航栏注销掉隐藏，首页使用原生导航栏即可，不影响其他功能导航栏
    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <View style={[styles.toolBar]}>
                <Text style={[styles.navigaTitleStyle]}>应用</Text>
            </View>
        ),
        headerStyle: {
            backgroundColor: '#FFFFFF'
        },
    });

    componentWillMount() {
        storage.save({
            key: 'loginState',
            data: {
                token: token,
                chient: chient,
                edition: edition
            },
            expires: null
        });

    }

    constructor(props) {
        super(props);
    }

    _onClick = (notifit) => {
        //通告栏点击事件(1:可以，0:不可以)
        console.log(notifit.notice);
        //调用原生点击布告栏功能入口，集成后开启即可
        // {
        //     notifit.notice == '0' ?
        //         (null) :
        //         (RNCalliOSAction.calliOSActionPushNotificationCenter())
        // }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ backgroundColor: '#dddddd' }}>
                    <Banner style={{ width: AutoUtil.screenWidth(), height: AutoUtil.screenWidth() * (200.0 / 375.0) }} />
                    <NoticeBar
                        style={{ backgroundColor: 'white' }}
                        marqueeProps={{ loop: true, leading: 500, trailing: 800, fps: 40, style: { color: 'black' } }}
                        onClick={() => this._onClick(ibmsStore.notifit)}
                    >
                        {ibmsStore.notifit.content}
                    </NoticeBar>
                    <WhiteSpace size="xs" />
                    <AppItem
                        JUMP={this.props.navigation} />
                </ScrollView>
            </View>
        );
    }
}

const stackNavigator = StackNavigator({
    App: { screen: App },
    //以下控制器在集成后将不再此注册
    IbmsCompanyList: { screen: IbmsCompany },
    IbmsAppList: { screen: IbmsApp },
    IbmsControl: { screen: IbmsControl },
    IbmsNoticeDetail: { screen: IbmsNoticeDetail },
    ANList: { screen: AlarmNotificationList },
    WorkOrderProcess: { screen: WorkOrderProcessing },
    IBMSWorkOrderDel: { screen: IBMSWorkOrderDel },
    DealwithOrder: { screen: DealwithOrder },

}, {
        // headerMode: 'none'
    }
);
const styles = StyleSheet.create({
    navigaTitleStyle: {
        color: 'black',
        fontSize: 18,
    },
    toolBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default stackNavigator



