import React, { Component } from 'react';
import {
    Alert, View, Image, TouchableHighlight, Text, StyleSheet
} from 'react-native';
import { observer, inject } from "mobx-react";
import { observable, computed, action, transaction, toJS, runInAction } from 'mobx';
import moment from 'moment';
import styles from './style';
import SYImagePicker from 'react-native-syan-image-picker';

@observer
export default class PictureSelect extends Component {
    @observable photos = []

    constructor(props) {
        super(props)

    }

    handlePicList() {
        let picList = []
        this.photos.map(item => {
            picList.push(item.uri)
        })
        this.props.handlePicList(picList)
    }



    //选择照片
    @action
    submit = () => {
        SYImagePicker.showImagePicker({ imageCount: 9, isRecordSelected: true }, (err, photos) => {
            if (!err) {
                this.photos = photos
                this.handlePicList()
            }
        })

    }
    //删除制定照片
    @action
    delete = (item) => {
        let index = this.photos.indexOf(item)
        this.photos.splice(index, 1);
        // 更新原生图片数组
        SYImagePicker.removePhotoAtIndex(index);
        this.handlePicList()
    }

    //显示图片名称
    showPicName(value) {
        let name = (moment(new Date(value / 1000)).format("YYYYMMDD_HH_mm_ss"))
        if (name == 'Invalid data') {
            name = value
        }
        return <Text style={[styles.titleStyle]} numberOfLines={1}>{value}</Text>
    }

    render() {

        return (
            <View style={styles.contentStyle}>
                {this.photos.map(item => {
                    let list = item.uri.split('/')
                    let text = list[list.length - 1]
                    return <View>
                        <View style={styles.lineStyle} />
                        <View style={[styles.itemStyle]}>
                            <Image style={[styles.iconStyle]}
                                source={{ uri: item.uri }} />
                            {this.showPicName(text)}
                            <TouchableHighlight underlayColor='#dddddd'
                                onPress={() => this.delete(item)}>
                                <Image style={[styles.deleteStyle]}
                                    source={require('../../images/ibms/delete_icon.png')} />
                            </TouchableHighlight>
                        </View>
                    </View>
                })}
                <View style={styles.lineStyle} />
                <TouchableHighlight underlayColor='#dddddd'
                    onPress={() => this.submit()}>
                    <View style={styles.submitStyle}>
                        <Image style={styles.submitIconStyle}
                            resizeMode='center'
                            source={require('../../images/ibms/add_info_icon.png')} />
                        <Text style={styles.submitTextStyle}>添加附件</Text>
                    </View>

                </TouchableHighlight>
            </View>
        );
    }
}
