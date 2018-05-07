import React, { Component, PropTypes } from 'react';
import {
    Alert,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    FlatList,
    Image,
    SafeAreaView
} from 'react-native';
import NavigationItem from "../../widget/NavigationItem";
import { ToobBar } from "../../components/Text";
import AutoUtil from "../../utils/AutoUtil";
import ibmsStore from "../../stores/ImbsStore";
import { observer } from "mobx-react";
import color from "../../widget/color";
import Separator from "../../widget/Separator";
import SpacingView from "../../widget/SpacingView";
import { StackNavigator } from "react-navigation";
import DealwithOrder from "./IBMSDealwithOrder";


var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const initData = function (workorderId) {
    return Promise.all([ibmsStore.getWorkOrderDetail(workorderId)]);
};

@observer
class IBMSWorkOrderDetail extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <View style={styles.toolBar}>
                <ToobBar style={styles.searchBar}>工单详情</ToobBar>
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

    constructor(props) {
        super(props);
        this.state = {
            workorderId: '',
        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        const workorderId = params ? params.workorderId : null;
        this.state.workorderId = workorderId;
        initData(this.state.workorderId).then(data => {
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.topViewStyle}>
                <View style={{ flex: 1, backgroundColor: color.bg }}>
                    <ScrollView >
                        <SpacingView />
                        <View style={styles.viewStyle}>
                            <Text style={styles.textLeftStyle}>工单编号:</Text>
                            <View>{this.showOrderNumber()}</View>
                        </View>
                        <Separator />
                        <View style={styles.viewStyle}>
                            <Text style={styles.textLeftStyle}>工单状态</Text>
                            <View>{this.showOrderStatus(ibmsStore.workOrderDetail.workStatus)}</View>
                        </View>
                        <View>{this.showProcess(ibmsStore.workOrderDetail.workStatus)}</View>
                        <SpacingView />
                        <View style={styles.viewStyle}>
                            <Text style={styles.textLeftStyle}>工单创建者</Text>
                            <Text style={styles.textRightStyle}>{ibmsStore.workOrderDetail.alarmSender}</Text>
                        </View>
                        <Separator />
                        <View style={styles.viewStyle}>
                            <Text style={styles.textLeftStyle}>工单创建时间</Text>
                            <Text style={styles.textRightStyle}>{ibmsStore.workOrderDetail.createDate}</Text>
                        </View>
                        <SpacingView />
                        <View style={styles.viewStyle}>
                            <Text style={styles.textLeftStyle}>设备名称</Text>
                            <Text
                                style={[styles.textRightStyle, styles.textRightStyle_flex]}>{ibmsStore.workOrderDetail.equipmentName}</Text>
                        </View>
                        <Separator />
                        <View style={styles.viewStyle}>
                            <Text style={styles.textLeftStyle}>子系统</Text>
                            <Text style={styles.textRightStyle}>{ibmsStore.workOrderDetail.subsystemName}</Text>
                        </View>
                        <SpacingView />
                        <View style={styles.viewStyle}>
                            <Text style={styles.textLeftStyle}>警告级别</Text>
                            <Text
                                style={[styles.textRightStyle, styles.textRightStyleColor_red]}>{ibmsStore.workOrderDetail.alarmLevel}</Text>
                        </View>
                        <Separator />
                        <View style={styles.viewStyle}>
                            <Text style={styles.textLeftStyle}>警告名称</Text>
                            <Text style={styles.textRightStyle}>{ibmsStore.workOrderDetail.alarmName}</Text>
                        </View>
                        <Separator />
                        <View style={styles.viewStyle}>
                            <Text style={styles.textLeftStyle}>警告类别</Text>
                            <Text style={styles.textRightStyle}>{ibmsStore.workOrderDetail.alarmCategory}</Text>
                        </View>
                        <SpacingView />
                        <View style={styles.viewStyle}>
                            <Text style={styles.textLeftStyle}>警告发生次数</Text>
                            <Text
                                style={[styles.textRightStyle, styles.textRightStyleColor_black]}>{ibmsStore.workOrderDetail.alarmCount}</Text>
                        </View>
                        <Separator />
                        <View style={styles.viewStyle}>
                            <Text style={styles.textLeftStyle}>首次发生时间</Text>
                            <Text style={styles.textRightStyle}>{ibmsStore.workOrderDetail.alarmFirstOccureTime}</Text>
                        </View>
                        <Separator />
                        <View style={styles.viewStyle}>
                            <Text style={styles.textLeftStyle}>末次发生时间</Text>
                            <Text style={styles.textRightStyle}>{ibmsStore.workOrderDetail.alarmLastOccureTime}</Text>
                        </View>
                        <SpacingView />
                    </ScrollView>
                </View>
                <View>
                    {this.showTouchableOpacity(ibmsStore.workOrderDetail.workStatus)}
                </View>
            </SafeAreaView>
        );
    }

    /**
     * 显示工单编号
     * @returns {*}
     */
    showOrderNumber() {
        var orderNumber = ibmsStore.workOrderDetail.id + '';
        var str = orderNumber.length;
        if (str >= 10) {
            orderNumber = orderNumber.substring(str - 10, str);
        }

        return (<Text style={styles.textRightStyle}>{orderNumber}</Text>);
    }

    /**
     * 显示处理状态颜色
     * @param orderStatus
     * @returns {*}
     */
    showOrderStatus(orderStatus) {
        if (orderStatus === '0') {
            return (<Text
                style={[styles.textRightStyle, styles.textRightStyleColor_fd]}>{ibmsStore.workOrderDetail.workStatusName}</Text>);
        } else {
            return (<Text
                style={[styles.textRightStyle, styles.textRightStyleColor_1f]}>{ibmsStore.workOrderDetail.workStatusName}</Text>);
        }
    }

    /**
     * 是否显示完成处理工单的内容
     * @param orderStatus
     * @returns {*}
     */
    showProcess(orderStatus) {
        if (orderStatus === '0') {
            return (<View />);
        } else {
            return (
                <View>
                    <Separator />
                    <View style={styles.viewStyle}>
                        <Text style={styles.textLeftStyle}>处理人</Text>
                        <Text style={styles.textRightStyle}>{ibmsStore.workOrderDetail.alarmRecevier}</Text>
                    </View>
                    <Separator />
                    <View style={styles.viewStyle}>
                        <Text style={styles.textLeftStyle}>处理时间</Text>
                        <Text style={styles.textRightStyle}>{ibmsStore.workOrderDetail.updateDate}</Text>
                    </View>
                    <Separator />
                    <View style={styles.viewProcessConStyle}>
                        <Text style={styles.textProcessTitleStyle}>处理状况</Text>
                        <Text style={styles.textProcessConStyle}>{ibmsStore.workOrderDetail.context}</Text>
                        <View>{this.showProcessConImage(ibmsStore.workOrderDetail.url)}</View>
                    </View>
                </View>
            );
        }
    }

    /**
     * 是否显示处理工单按钮
     * @param orderStatus
     * @returns {*}
     */
    showTouchableOpacity(orderStatus) {
        if (orderStatus === '0') {
            return (
                <View style={styles.btnViewStyle}>
                    <Separator />
                    <TouchableOpacity style={styles.btnStyle}
                        onPress={() => this.props.navigation.navigate('DealwithOrder', {
                            orderId: this.state.workorderId,
                            name: ibmsStore.workOrderDetail.alarmRecevier,
                        })
                        }>
                        <Text style={styles.btnTextStyle}>
                            处理工单
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (<View />);
        }
    }

    /**
     * 是否显示处理工单内容的图片
     * @param url
     * @returns {*}
     */
    showProcessConImage(url) {
        var data = [];
        var str = url + '';
        if (str.length > 0) {
            var strUrl = str.split(',');
            for (var i = 0; i < strUrl.length; i++) {
                data.push({ key: i, id: strUrl[i] });
            }

            return (<View style={{ flex: 1 }}>
                <FlatList
                    renderItem={this._renderItem}//根据行数据data渲染每一行的组件
                    horizontal={true}//水平显示
                    showsHorizontalScrollIndicator={false}//设为false，则不显示水平滚动条
                    // getItemLayout={(data, index) => (
                    //     {length: 50, offset: (50 + 2) * index, index}
                    // )}
                    // keyExtractor={(item, index) => index}//用于为给定的item生成一个不重复的key（Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销）
                    data={data}>
                </FlatList>
            </View>);
        } else {
            return (<View />);
        }
    }

    _renderItem = (item) => {
        return (
            <TouchableHighlight style={[{ marginTop: 10, marginRight: 10 }]}
                onPress={() => {
                    Alert.alert("我只是一个提示...")
                }}>
                {/*<Image style={[styles.iconStyle]}*/}
                {/*source={{uri: 'http://mmbiz.qpic.cn/mmbiz_png/57sLf8oUA1uepOTibZr8poZneiaia0KXlVOdlo6ibMIGkLhicQiaX0clFWMRdYuCe4bTicwMYsqpFybUGlSTqzj68kS5Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1'}}/>*/}
                <Image style={[styles.iconStyle]}
                    source={{ uri: this.changeHeaderUrl(item.index.id, '382303eebfd447988e16aa29ce01aaeb', 'img', '480', '480') }} />
            </TouchableHighlight>
        )
    }

    /**
     * 图像地址转换
     *
     * @param id     图片ID
     * @param token  有效令牌
     * @param type   文件方式
     * @param width  设置宽度（非1：1的图片，以宽度为基准）
     * @param height 设置高度
     * @return
     */
    changeHeaderUrl(id, token, type, width, height) {
        var strUrl = 'https://testfile.tfhulian.com/view/view?token=' + token + '&id=' + id;
        // Alert.alert(strUrl)
        if (type.length > 0) {
            strUrl = strUrl + '&type=' + type;
        }
        if (width.length > 0) {
            strUrl = strUrl + '&width=' + width + '&height=' + height;
        }
        return strUrl;
    }

}

const styles = StyleSheet.create({
    topViewStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
    },
    viewStyle: {
        width: WIDTH,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
    },
    viewProcessConStyle: {
        width: WIDTH,
        backgroundColor: 'white',
        padding: 10,
    },
    navigaTitleStyle: {
        color: 'black',
        fontSize: 18,
    },
    contentContainer: {
        flex: 1,
        width: WIDTH,
        backgroundColor: color.bg
    },
    textLeftStyle: {
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        color: 'black',

    },
    textRightStyle: {
        fontSize: 16,
    },
    textRightStyle_flex: {
        flex: 1,
        textAlign: 'right',
        marginLeft: 18,
    },
    textProcessTitleStyle: {
        fontSize: 20,
        color: 'black',
    },
    textProcessConStyle: {
        fontSize: 16,
    },

    textRightStyleColor_red: {
        color: 'red'
    },
    textRightStyleColor_black: {
        color: 'black'
    },
    textRightStyleColor_fd: {
        color: color.color_fd9220
    },
    textRightStyleColor_1f: {
        color: color.color_1f8fdf
    },
    btnViewStyle: {
        width: WIDTH,
        backgroundColor: 'white',
    },
    btnStyle: {
        width: WIDTH,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
    },

    btnTextStyle: {
        fontSize: 18,
        color: color.color_1f8fdf,
    },
    iconStyle: {
        width: 60,
        height: 60,

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
    iconStyle: {
        width: AutoUtil.getWidth(9),
        height: AutoUtil.getHeight(16),
        marginLeft: AutoUtil.getWidth(16),
    },
})
export default IBMSWorkOrderDetail