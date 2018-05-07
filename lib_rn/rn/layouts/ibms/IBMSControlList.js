import React, { Component, PropTypes } from 'react';
import { StackNavigator } from 'react-navigation';
import { observer, inject } from "mobx-react";
import { View, Image, TouchableOpacity, StyleSheet, NativeModules, NativeAppEventEmitter, ActivityIndicator } from 'react-native';
import Accordion from 'antd-mobile/lib/accordion';
import List from 'antd-mobile/lib/list';

import ibmsStore from "../../stores/ImbsStore";
import AutoUtil from "../../utils/AutoUtil";
import { ToobBar } from "../../components/Text";
import NavigationItem from "../../widget/NavigationItem";
import color from "../../widget/color";

const initData = function (type, communityID) {
    ibmsStore.controlList = [];
    return Promise.all([ibmsStore.getControlList(type, communityID)]);
};
// var RNCalliOSAction = NativeModules.TFRNCalliOSAction;

@observer
export default class IBMSControlList extends Component {
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
    });
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        initData(this.props.navigation.state.params.type, this.props.navigation.state.params.communityID).then(data => { });
    };
    //点击事件(调用原生，与原生交互跳转原生视频监控控制器)
    _onListClick = (item) => {
        console.log(item.name);
        // RNCalliOSAction.calliOSActionWithVideo(item, this.props.navigation.state.params.type);
    };
    _dotIcon = () => {
        return (<Image style={{ width: 18, height: 6, resizeMode: 'contain', }} source={require('../../images/WechatIMG2.png')} />)
    };
    renderAccessControl = (accessControl) => {
        var accessControlArr = [];
        for (var i = 0; i < accessControl.length; i++) {
            let item = accessControl[i];
            accessControlArr.push(
                //子菜单前面有一个原点，加一个空白样式会好看些
                <List.Item
                    thumb={this._dotIcon()}
                    multipleLine='true'
                    wrap='true'
                    key={i}
                    onClick={() => this._onListClick(item)}
                >
                    {'' + item.name}
                </List.Item>
            )
        }
        return accessControlArr;
    };
    renderList = (list) => {
        var itemArr = [];
        for (var i = 0; i < list.length; i++) {
            let item = list[i];
            itemArr.push(
                <Accordion.Panel style={[styles.PanelStyle]} key={i} header={item.name}>
                    <List>
                        {this.renderAccessControl(item.accessControl)}
                    </List>
                </Accordion.Panel>
            )
        }
        return itemArr;
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
        if (ibmsStore.controlList != '') {
            return (
                <View style={{ flex: 1, backgroundColor: color.bg }}>
                    <Accordion
                        style={{ backgroundColor: 'white' }}
                    >
                        {this.renderList(ibmsStore.controlList)}
                    </Accordion>
                </View>
            );
        }
        else {
            return (
                this.renderLoadingView()
            );
        }

    };
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
    PanelStyle: {
        width: AutoUtil.screenWidth(),
        height: 50,
    },
    ListStyle: {
        width: AutoUtil.screenWidth(),
        height: 40,
    },
    activityIndicator: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.bg,
    },
})