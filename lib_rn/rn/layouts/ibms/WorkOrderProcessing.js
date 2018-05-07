import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Alert, ActivityIndicator
} from 'react-native';
import TopMenu from '../../widget/Form'

import NavigationItem from "../../widget/NavigationItem";
import AutoUtil from "../../utils/AutoUtil";
import color from "../../widget/color";
import {ToobBar} from "../../components/Text";
import {observer} from "mobx-react";
import useStrict, {observable, action} from 'mobx';
import ibmsStore from "../../stores/ImbsStore";
import IBMSProjectListItem from "./IBMSDetailListItem";
import IBMSGDItem from "./IBMSGDItem";

let WIDTH = Dimensions.get('window').width;
let HEIGHT = Dimensions.get('window').height;
const initData = function (officeID, type) {
    ibmsStore.workOrderList = [];
    return Promise.all([ibmsStore.getWorkOrderState(), ibmsStore.getWorkOrderList(officeID, type, "1", "20")]);
};

let pageNo = 1;//当前第几页

@observer
class WorkOrderProcessing extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: (
            <View style={styles.toolBar}>
                <ToobBar style={styles.searchBar}>工单处理</ToobBar>
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

    constructor() {
        super()
        this.state = {
            data: [],
            officeID: '',
            refreshState: false,
            type: '0',
            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        };
    }

    componentWillMount() {
        const {params} = this.props.navigation.state;
        const title = params ? params.title : null;
        const officeID = params ? params.officeID : null;
        // this.state.officeID = '5e870269ed054e6abfe37fac50b71590';
        this.state.officeID = officeID;
        //请求数据
        this.refreshing();
    }

    onPress = () => {
        Alert.alert('yes');
    }
    renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={[styles.touchStyle]}
                activeOpacity={1}
                onPress={() => {
                    // Alert.alert("你点啥？")
                    this.props.navigation.push('IBMSWorkOrderDel', { workorderId: item.id })
                }}
            >
                <IBMSGDItem equipmentName={item.equipmentName} workStatusName={item.workStatusName}
                            id={item.id}
                            createDate={item.createDate}
                />
            </TouchableOpacity>
        );
    };

    renderContent() {
        let alarmQuery = ibmsStore.workOrderList;
        return (

            <FlatList
                style={[styles.flatListStyle]}
                data={alarmQuery}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={(item, index) => item.id}
                onRefresh={this.refreshing}
                ListFooterComponent={this._renderFooter.bind(this)}
                refreshing={this.state.refreshState}
                onEndReached={this._onEndReached.bind(this)}
                showsVerticalScrollIndicator = {false}
                onEndReachedThreshold={1}
            />
        );
    }

    onSelectMenu = (index, subindex, data) => {
        this.state.type = data.code;
        this.refreshing();
    }
    refreshing = () => {
        this.setState({refreshState: true});
        let timer = setTimeout(() => {
            clearTimeout(timer)
            initData(this.state.officeID, this.state.type).then(data => {
                // this.state.refreshState = false;
                this.setState({refreshState: false});
            });
        }, 1500)
    };

    render() {
        // let ddd = ibmsStore.workOrderState;
        let array = ibmsStore.workOrderState;
        if (ibmsStore.workOrderState.length > 0) {
            const source = {selectedIndex: 0, type: 'title', data: array};
            this.state.data = [source];
            // this.state.data = ibmsStore.workOrderState;
            return (
                <View style={styles.container} ref="MAIN">
                    <TopMenu config={this.state.data} onSelectMenu={this.onSelectMenu}
                             renderContent={this.renderContent()}/>
                </View>
            );
        }
        else {
            return (
                this.renderLoadingView()
            );
        }
    }

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
    }

    _onEndReached() {
        //如果是正在加载中或没有更多数据了，则返回
        if (this.state.showFoot != 0) {
            return;
        }
        if (this.state.data.length < 20) {
            //没有更多数据了
            this.setState({showFoot: 1});
            return;
        }
        pageNo++;
        //获取数据
        // this.fetchData(pageNo);
        ibmsStore.getWorkOrderList(this.state.officeID, this.state.type, pageNo, "20")
        let data = ibmsStore.queryConditionList;
        if (data.length > 0) {
            this.state.data = this.state.data.concat(data);
            this.setState({showFoot: 1});
        } else {
            //没有更多数据了
            this.setState({showFoot: 1});
        }

    }

    _renderFooter() {
        if (this.state.showFoot === 1) {
            return (
                <View style={{height: 30, alignItems: 'center', justifyContent: 'flex-start',}}>
                    <Text style={{color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if (this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator/>
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if (this.state.showFoot === 0) {
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    iconStyle: {
        width: AutoUtil.getWidth(9),
        height: AutoUtil.getHeight(16),
        marginLeft: AutoUtil.getWidth(16),
    },
    toolBar: {
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
    flatListStyle: {
        width: WIDTH,
        height: HEIGHT - 64,
        backgroundColor: color.bg,
    },
    activityIndicator: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.bg,
    },
    footer: {
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
});
export default WorkOrderProcessing