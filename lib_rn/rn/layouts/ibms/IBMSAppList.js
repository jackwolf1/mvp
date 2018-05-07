import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { observer } from "mobx-react";
import { observable, action } from 'mobx';
import ibmsStore from "../../stores/ImbsStore";
import IBMSAppItem from './IBMSAppItem';
import AutoUtil from "../../utils/AutoUtil";
import { ToobBar } from "../../components/Text";
import NavigationItem from "../../widget/NavigationItem";
import color from "../../widget/color";

const initData = function (communityID) {
    return Promise.all([ibmsStore.getAppList(communityID)]);
};

class MyClass {
    @observable refreshState = false;
    @action changeRefreshState = (state) => {
        this.refreshState = state;
    }
}
const newStore = new MyClass();
@observer
export default class IBMSAppList extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <View style={[styles.toolBar]}>
                <ToobBar style={[styles.navigaTitleStyle]}>{navigation.state.params.title}</ToobBar>
            </View>
        ),
        headerLeft: (
            <NavigationItem
                iconStyle={[styles.iconStyle]}
                icon={require('../../images/ic_title_bar_left.png')}
                title={'返回'}
                onPress={() => {
                    navigation.goBack()
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
        this.state = {
            icon: [
                require('../../images/gaojing.png'),
                require('../../images/gongdan.png'),
                require('../../images/shipin.png'),
                require('../../images/menjin.png'),
            ],
        }
    }
    componentWillMount() {
        this.refreshing(this.props.navigation.state.params.communityID);
    }
    refreshing = (communityID) => {
        newStore.changeRefreshState(true);
        let timer = setTimeout(() => {
            clearTimeout(timer)
            initData(communityID).then(data => { newStore.changeRefreshState(false) });
        }, 1500)
    };
    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={[styles.touchStyle]}
                activeOpacity={1}
                onPress={() => {
                    //根据功能标题分别判断跳转，跳转的页面需在IBMSCompanyList.js中注册
                    item.sysName == '告警通知' ?
                        (this.props.navigation.push('ANList', { title: item.sysName, buildingID: ibmsStore.appListData.hosingId })) :
                        (item.sysName == '工单处理' ?
                            (this.props.navigation.push('WorkOrderProcess', { title: item.sysName,officeID: ibmsStore.appListData.hosingId })) :
                            (item.sysName == '视频监控' ?
                                (this.props.navigation.push('IBMSControl', { title: item.sysName, communityID: ibmsStore.appListData.id, type: '0' })) :
                                (this.props.navigation.push('IBMSControl', { title: item.sysName, communityID: ibmsStore.appListData.id, type: '1' }))))
                }}>
                <IBMSAppItem title={item.sysName} address={item.description} cnt={item.cnt} icon={this.state.icon[index]} />
            </TouchableOpacity>
        );
    };
    _separator = () => {
        return <View style={{ height: 1, backgroundColor: '#dddddd' }} />;
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
        if (ibmsStore.appList != '') {
            return (
                <FlatList
                    style={[styles.flatListStyle]}
                    data={ibmsStore.appList}
                    renderItem={this.renderItem.bind(this)}
                    ItemSeparatorComponent={this._separator}
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