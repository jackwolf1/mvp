import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    Animated,
    TouchableWithoutFeedback,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    PixelRatio,
    Dimensions,
    Alert, ActivityIndicator
} from 'react-native';

import TopMenu from '../../widget/DropDownMenu'

import NavigationItem from "../../widget/NavigationItem";
import AutoUtil from "../../utils/AutoUtil";
import color from "../../widget/color";
import { ToobBar } from "../../components/Text";
import { observer } from "mobx-react";
import useStrict, { observable, action } from 'mobx';
import ibmsStore from "../../stores/ImbsStore";
import IBMSProjectListItem from "./IBMSDetailListItem";
// import IBMSProjectListItem from "./IBMSGDItem";
// import IBMSAlarmNoticeDetail from './IBMSAlarmNoticeDetail';

let WIDTH = Dimensions.get('window').width;
let HEIGHT = Dimensions.get('window').height;
const initData = function (buildingID, levelID, childID, cateID) {
    ibmsStore.alarmQueryList = [];
    return Promise.all([ibmsStore.getQueryConditionList(), ibmsStore.getAlarmQueryList(buildingID, levelID, childID, cateID, "1", "20")]);
    // return Promise.all([ibmsStore.getQueryConditionList()]);
    // return Promise.all([ibmsStore.getAlarmQueryList(buildingID, null, null, null, "1", "20")]);
};

let pageNo = 1;//当前第几页
let totalPage = 5;//总的页数
let itemNo = 0;//item的个数

// useStrict(true);
class MyState {
    //     @observable id = '';
    //     @observable name = '';
    @observable buildingID = '';
    @observable refreshState = false;
    //     @observable levelID = '';
    //     @observable childID = '';
    //     @observable cateID = '';
    //     @action addNum = (id, name) => {
    //         this.id = id;
    //         this.name = name;
    //     };
    @action refState = (refreshState) => {
        this.refreshState = refreshState;
    };
    @action getBuildingID = (refreshState, buildingID) => {
        this.refreshState = refreshState;
        this.buildingID = buildingID;
    };
    @action setBuildingID = (buildingID) => {
        this.buildingID = buildingID;
    };
    //     @action setID = (levelID, childID, cateID) => {
    //         this.levelID = levelID;
    //         this.childID = childID;
    //         this.cateID = cateID;
    //     };
}

const newState = new MyState();

@observer
class AlarmNotificationList extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <View style={styles.toolBar}>
                <ToobBar style={styles.searchBar}>告警通知</ToobBar>
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
            buildingID: '',
            levelID: null, childID: null, cateID: null,
            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        };
        // this.getNode = this.getNode.bind(this);
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        const title = params ? params.title : null;
        const buildingID = params ? params.buildingID : null;
        // const buildingID = '5e870269ed054e6abfe37fac50b71590';
        this.state.buildingID = buildingID;
        // this.setState({
        //     accountId: result,
        // });
        //请求数据
        this.refreshing();
    }

    onPress = () => {
        Alert.alert('yes');
    }
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={[styles.touchStyle]}
                activeOpacity={1}
                onPress={() => {
                    // Alert.alert("你点啥？")
                    console.log(item.alarmContent);
                    this.props.navigation.push('IbmsNoticeDetail', { communityID: item.id })
                }}
            >
                <IBMSProjectListItem equipmentName={item.equipmentName} alarmCount={item.alarmCount}
                    alarmSubSystemName={item.alarmSubSystemName}
                    alarmCategoryName={item.alarmCategoryName}
                    alarmLastOccureTime={item.alarmLastOccureTime} />
            </TouchableOpacity>
        );
    };

    renderContent() {
        let alarmQuery = ibmsStore.alarmQueryList;
        return (

            <FlatList
                style={[styles.flatListStyle]}
                data={alarmQuery}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={(item, index) => item.id}
                onRefresh={this.refreshing}
                ListFooterComponent={this._renderFooter.bind(this)}
                refreshing={newState.refreshState}
                showsVerticalScrollIndicator = {false}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={1}
            />
        );
    }

    onSelectMenu = (index, subindex, data) => {
        // newState.addNum(index, subindex);
        // this.setState({index, subindex, data});
        switch (index) {
            case 0:
                this.state.levelID = data.id;
                break;
            case 1:
                this.state.childID = data.id;
                break;
            case 2:
                this.state.cateID = data.id;
                break;
        }
        this.refreshing(this.state.levelID, this.state.childID, this.state.cateID);
    }
    refreshing = () => {
        newState.refState(true);
        let timer = setTimeout(() => {
            clearTimeout(timer)
            initData(this.state.buildingID, this.state.levelID, this.state.childID, this.state.cateID).then(data => {
                newState.refState(false);
            });
        }, 1500)
    };
    _onPressButton = () => {
        // newState.addNum();
        Alert.alert("我走了这");
    }

    render() {
        this.state.data = ibmsStore.queryConditionList;
        if (this.state.data != '') {
            return (
                <View style={styles.container} ref="MAIN">
                    <TopMenu config={this.state.data} onSelectMenu={this.onSelectMenu}
                        renderContent={this.renderContent()} />
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
            this.setState({ showFoot: 1 });
            return;
        }
        pageNo++;
        //获取数据
        // this.fetchData(pageNo);
        ibmsStore.getAlarmQueryList(this.state.buildingID, this.state.levelID, this.state.childID, this.state.cateID, pageNo, "20")
        let data = ibmsStore.queryConditionList;
        if (data.length > 0) {
            this.state.data = this.state.data.concat(data);
            this.setState({ showFoot: 1 });
        } else {
            //没有更多数据了
            this.setState({ showFoot: 1 });
        }

    }

    _renderFooter() {
        if (this.state.showFoot === 1) {
            return (
                <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>
                    <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if (this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
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

    fetchData(pageNo) {
        ibmsStore.getAlarmQueryList(this.state.buildingID, this.state.levelID, this.state.childID, this.state.cateID, pageNo, "20")
        let data = ibmsStore.queryConditionList;
        if (data.length > 0 && data.length < 20) {
            return;
        } else {
            pageNo++;
        }
        //底部显示正在加载更多数据
        this.setState({ showFoot: 2 });
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
        resizeMode: 'center',
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
        fontSize: 18,
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
export default AlarmNotificationList