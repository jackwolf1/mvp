import React, { Component } from "react";
import Swiper from 'react-native-swiper'
import {
    AppRegistry,
    View,
    Image,
    TouchableOpacity,
    NativeModules,
    NativeAppEventEmitter,//导入
} from 'react-native';
import ibmsStore from "../../stores/ImbsStore";
import { observer } from "mobx-react";
import { token } from '../../configs/config';
import AutoUtil from '../../utils/AutoUtil';

var RNCalliOSAction = NativeModules.TFRNCalliOSAction;

const TF_UPLOAD_FILE_HOST_NAME = 'https://testfile.tfhulian.com';
const initData = function () {
    return Promise.all([ibmsStore.getAppBanner()]);
};

@observer
export default class BannerViewJS extends Component {
    componentWillMount() {
        //请求数据
        initData().then(data => { });
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ width: AutoUtil.screenWidth(), height: AutoUtil.screenWidth() * (200.0 / 375.0), flex: 1 }}>
                <Swiper
                    autoplay={true}
                    autoplayTimeout={4}
                    showsPagination={true}
                    showsButtons={false}
                    key={ibmsStore.banner.length}
                    dot={<View style={{ backgroundColor: 'gray', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
                    activeDot={<View style={{ backgroundColor: 'white', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    paginationStyle={{
                        bottom: 5
                    }}
                >
                    {this.renderBanners(ibmsStore.banner)}
                </Swiper>
            </View>
        )
    }
    /***
     *  渲染banners的函数
     */
    itemClick = (item) => {
        //首页轮播图点击事件调用
        console.log(item.type)
        //banner点击事件跳转调用原生方法名，集成进原生后开启即可
        // {
        //     item.type != '1' ? (
        //         null
        //     ) :
        //         (

        //             RNCalliOSAction.calliOSActionPushBanner(item)
        //         )
        // }
    }
    renderBanners = (banners) => {
        //1.定义组件数组
        var itemArr = [];
        for (var i = 0; i < banners.length; i++) {
            //2.获取每一个banner
            let banner = banners[i];
            //3.添加组件
            let imageUrl = TF_UPLOAD_FILE_HOST_NAME + '/view/view?token=' + token + '&id=' + banner.image + '&type=img';
            itemArr.push(
                <View key={i} style={{ flex: 1, height: AutoUtil.screenWidth() * (200.0 / 375.0) }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.itemClick(banner)}>
                        <Image
                            source={{ uri: imageUrl }}
                            style={{ width: AutoUtil.screenWidth(), height: AutoUtil.screenWidth() * (200.0 / 375.0), resizeMode: 'cover' }}
                            defaultSource={require('../../images/loading.png')}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
        //4.返回组件数组
        return itemArr;
    }
}