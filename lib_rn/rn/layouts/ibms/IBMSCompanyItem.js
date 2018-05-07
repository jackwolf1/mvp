import React, { Component, PropTypes } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AutoUtil from "../../utils/AutoUtil";

export default class IBMSCompanyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            address: this.props.address,
            cnt: this.props.cnt,
            icon: this.props.icon,
        }
    }
    render() {
        return (
            <View style={[styles.itemViewStyle]}>
                <Image style={[styles.iconStyle]} source={this.state.icon} />
                <View style={[styles.nuCntTextViewStyle]}>
                    <Text style={[styles.titleStyle]} numberOfLines={1}>{this.state.title}</Text>
                    <Text style={[styles.addressStyle]} numberOfLines={1}>{this.state.address}</Text>
                </View>
                <Image style={[styles.enterStyle]} source={require('../../images/箭头.png')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemViewStyle: {
        height: AutoUtil.screenWidth() / 5 - 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white',
        borderRadius: 4,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    iconStyle: {
        height: AutoUtil.screenWidth() / 5 - 10 - 10,
        width: AutoUtil.screenWidth() / 5 - 10 - 10,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        resizeMode: 'contain',
    },
    nuCntTextViewStyle: {
        flex: 1,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'white',
        justifyContent: 'space-around',
    },
    titleStyle: {
        fontSize: 16,
        color: 'black',
    },
    addressStyle: {
        fontSize: 14,
        color: '#999999',
    },
    enterStyle: {
        width: 20,
        height: AutoUtil.screenWidth() / 5 - 10,
        marginLeft: 5,
        marginRight: 5,
        resizeMode: 'contain',
    }
})