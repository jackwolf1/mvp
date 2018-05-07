import {
    View,
    TouchableOpacity,
    StyleSheet,
    NativeModules,
    NativeAppEventEmitter,//导入
} from 'react-native';
import React, { Component, PropTypes } from "react";
import ibmsStore from "../../stores/ImbsStore";
import { observer } from "mobx-react";
import FlatListItem from './FlatListItem';
import Grid from 'antd-mobile/lib/grid';
import AutoUtil from '../../utils/AutoUtil';

const ItemData = [
    {
        title: null,
        messageNum: '0'
    },
    {
        title: null,
        messageNum: '0'
    },
    {
        title: null,
        messageNum: '0'
    },
    {
        title: null,
        messageNum: '0'
    },
];

// var RNCalliOSAction = NativeModules.TFRNCalliOSAction;
const initData = function () {
    return Promise.all([ibmsStore.getAppItemList()]);
};
@observer
export default class SwiperViewJS extends Component {
    constructor(props) {
        super(props);
    }

    //首页跳转原生功能方法，集成后开启即可
    _itemClick = (item) => {
        { item.type == 'ibms' ? (this.props.JUMP.push('IbmsCompanyList', { title: item.title })) : (null) }
        // RNCalliOSAction.calliOSActionPushApplication(item);
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Grid
                    style={[styles.flatStyle]}
                    data={ibmsStore.appItemList}
                    renderItem={dataItem => (
                        <TouchableOpacity activeOpacity={1} onPress={() => this._itemClick(dataItem)}>
                            <FlatListItem TextBackColor={dataItem.title == null ? ([styles.textGrayStyle]) : ([styles.textWhiteStyle])} ImageUrl={dataItem.icon} Title={dataItem.title} Num={dataItem.messageNum} />
                        </TouchableOpacity>
                    )}
                    itemStyle={{ height: (AutoUtil.screenWidth() - 1.5) / 3 * 123 / 125, width: (AutoUtil.screenWidth()) / 3 }}
                    columnNum={3}
                    hasLine
                />
            </View>
        );
    };

    componentWillMount() {
        //请求数据
        ibmsStore.appItemList = ItemData;
        initData().then(data => { });
    };
}
const styles = StyleSheet.create({
    flatStyle: {
        backgroundColor: '#dddddd',
    },
    textGrayStyle: {
        backgroundColor: '#dddddd',
        width: 49,
    },
    textWhiteStyle: {
        backgroundColor: 'white',
    }

});
