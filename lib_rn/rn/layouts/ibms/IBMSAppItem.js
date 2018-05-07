import React, { Component, PropTypes } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AutoUtil from "../../utils/AutoUtil";

export default class IBMSProjectListItem extends Component {
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
                {
                    this.state.cnt == 0 ? (
                        <View style={[styles.nuCntTextViewStyle]}>
                            <Text style={[styles.titleStyle]} numberOfLines={1}>{this.state.title}</Text>
                            <Text style={[styles.addressStyle]} numberOfLines={1}>{this.state.address}</Text>
                        </View>
                    ) : (
                            <View style={[styles.textViewStyle]}>
                                <Text style={[styles.titleStyle]} numberOfLines={1}>{this.state.title}</Text>
                                <Text style={[styles.addressStyle]} numberOfLines={1}>{this.state.address}</Text>
                            </View>
                        )
                }
                {
                    this.state.cnt == 0 ? (null) : (
                        <View style={[styles.cntViewStyle]}>
                            <Text style={[styles.cntStyle]}>{this.state.cnt}</Text>
                        </View>
                    )
                }
                <Image style={[styles.enterStyle]} source={require('../../images/箭头.png')} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    itemViewStyle: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iconStyle: {
        height: AutoUtil.screenWidth() / 5 - 20,
        width: AutoUtil.screenWidth() / 5 - 30,
        marginLeft: 10,
        marginTop: 10,
        resizeMode: 'contain',
    },
    nuCntTextViewStyle: {
        flex: 1,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'space-around',
    },
    textViewStyle: {
        flex: 1,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
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
    cntViewStyle: {
        width: 20,
        height: 20,
        marginTop: (AutoUtil.screenWidth() / 5 - 20) / 2,
        backgroundColor: '#E65D4A',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cntStyle: {
        fontSize: 16,
        color: 'white',
    },
    enterStyle: {
        height: AutoUtil.screenWidth() / 5,
        width: 20,
        marginRight: 5,
        resizeMode: 'contain',
    },
})