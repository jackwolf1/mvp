import React, {Component} from 'react';
import {Text, SafeAreaView, View, StyleSheet, Dimensions, SectionList} from 'react-native';
// import AutoUtil from '../../utils/AutoUtil';
import AutoUtil from '../../utils/AutoUtil';
import {observer, inject} from "mobx-react";
import ibmsStore from "../../stores/ImbsStore";
import {LocationService} from '../../service/LocationService';
import {ToobBar} from "../../components/Text";
import {StackNavigator} from 'react-navigation';
import NavigationItem from "../../widget/NavigationItem";
import NoticeDetailItem, {NoticeDetailItemA, separator, sectionCompHe, DataArray} from './NoticeDetailItem';

var WIDTH = Dimensions.get('window').width;


@observer
export default class NoticeDetail extends Component {


    static navigationOptions = ({navigation}) => ({
        headerTitle: (
            // <Text style={[styles.navigaTitleStyle]}>告警详情</Text>

            <View style={[styles.toolBar]}>
                <ToobBar style={[styles.navigaTitleStyle]}>告警详情</ToobBar>
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


    componentWillMount() {

        // var DetailID = this.props.navigation.state.params.communityID;
        this.initData();
    }

    initData() {

        return Promise.all([ibmsStore.getAlarmNoticeDetail(this.props.navigation.state.params.communityID)]);
    };

    render() {

        return (
            <SafeAreaView style={{flex: 1}}>
                <SectionList style={styles.flatStyle}
                             sections={DataArray}
                             renderItem={this.renderItem}
                             keyExtractor={(item, index) => index}
                             ItemSeparatorComponent={separator}
                             renderSectionHeader={sectionCompHe}
                >
                    {ibmsStore.alarmDetailInfo}
                </SectionList>
                <NoticeDetailItem communityID={this.props.navigation.state.params.communityID}
                                  navigationA={this.props.navigation}></NoticeDetailItem>
            </SafeAreaView>
        );
    }


    /**
     * item样式
     *
     * @memberof NoticeDetail
     */
    renderItem = ({item, index}) => {
        return (
            <NoticeDetailItemA item={item} alarmDetailInfo={ibmsStore.alarmDetailInfo}/>
        );

    }


}
const styles = StyleSheet.create({

    flatStyle: {
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    toolBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    navigaTitleStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: '#000000',
        fontSize: 18,
    },
})