import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, NativeModules } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IBMSCompanyItem from './IBMSCompanyItem';
import ibmsStore from "../../stores/ImbsStore";
import { observer } from "mobx-react";
import { observable, action } from 'mobx';
import NavigationItem from "../../widget/NavigationItem";
import { ToobBar } from "../../components/Text";
import AutoUtil from "../../utils/AutoUtil";
import color from "../../widget/color";

import IBMSAppList from './IBMSAppList';
import IBMSControl from './IBMSControlList';
import AlarmNotificationList from './AlarmNotificationList';
import WorkOrderProcessing from "./WorkOrderProcessing";
import IbmsNoticeDetail from './IBMSAlarmNoticeDetail';
import IBMSWorkOrderDel from './IBMSWorkOrderDetail';
import DealwithOrder from "./IBMSDealwithOrder";

// var RNCalliOSAction = NativeModules.TFRNCalliOSAction;

//'%E6%9D%8E%E6%B5%B7%E6%B6%9B'
const initData = function (name) {
    // return Promise.all([ibmsStore.getCompanys(name)]);
    return Promise.all([ibmsStore.getCompanys('%E6%9D%8E%E6%B5%B7%E6%B6%9B')]);
};
class MyClass {
    @observable refreshState = false;
    @action changeRefreshState = (state) => {
        this.refreshState = state;
    }
}
const newStore = new MyClass();
@observer
class IBMSCompanyList extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <View style={[styles.toolBar]}>
                <ToobBar style={[styles.navigaTitleStyle]}>IBMS</ToobBar>
            </View>
        ),
        headerLeft: (
            <NavigationItem
                iconStyle={[styles.iconStyle]}
                icon={require('../../images/ic_title_bar_left.png')}
                title={'返回'}
                onPress={() => {
                    // navigation.goBack()
                    //RN页面跳转回原生页面调用的返回方法
                    // RNCalliOSAction.calliOSActionWithBack();
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
    });
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // storage.save({
        //     key: 'userInfo',
        //     data: {
        //         userName: this.props["userName"],
        //         userId: this.props["userId"],
        //         token: this.props["token"],
        //         client: this.props["client"],
        //         edition: this.props["edition"],
        //     },
        //     expires: null
        // });
        // this.refreshing(this.props["userName"]);
        this.refreshing();
    }
    refreshing = () => {
        newStore.changeRefreshState(true);
        let timer = setTimeout(() => {
            clearTimeout(timer)
            initData().then(data => { newStore.changeRefreshState(false) });
        }, 1500)
    };

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={[styles.touchStyle]}
                activeOpacity={1}
                onPress={() =>
                    this.props.navigation.push('IBMSAppList', { title: item.name, communityID: item.id })
                }
            >
                <IBMSCompanyItem title={item.name} address={item.address} icon={require('../../images/xiaoqu.png')} />
            </TouchableOpacity>
        );
    };
    //加载等待页
    renderLoadingView() {
        return (
            <View style={styles.activityIndicator}>
                <ActivityIndicator
                    animating={true}
                    color='gray'
                    size="large"
                />
            </View>
        );
    };
    render() {
        if (ibmsStore.companyList != '') {
            return (
                <FlatList
                    style={[styles.flatListStyle]}
                    data={ibmsStore.companyList}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item, index) => item.id}
                    onRefresh={this.refreshing}
                    refreshing={newStore.refreshState}
                />
            );
        }
        else {
            return (
                this.renderLoadingView()
            );
        }
    }
}
//集成后开启此功能，以后各个模块页面注册均在各模块首页进行注册
const stackNavigator = StackNavigator({
    IBMSCompanyList: { screen: IBMSCompanyList },
    IBMSAppList: { screen: IBMSAppList },
    IBMSControl: { screen: IBMSControl },
    ANList: { screen: AlarmNotificationList },
    WorkOrderProcess: { screen: WorkOrderProcessing },
    IbmsNoticeDetail: { screen: IbmsNoticeDetail },
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
    iconStyle: {
        width: AutoUtil.getWidth(9),
        height: AutoUtil.getHeight(16),
        marginLeft: AutoUtil.getWidth(16),
        resizeMode: 'center',
    },
    toolBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListStyle: {
        flex: 1,
        backgroundColor: color.bg,
    },
    touchStyle: {
        width: AutoUtil.screenWidth(),
        height: AutoUtil.screenWidth() / 5,
    },
    activityIndicator: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.bg,
    },
})
export default stackNavigator