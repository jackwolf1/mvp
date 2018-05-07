import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AutoUtil from "../../utils/AutoUtil";

export default class IBMSGDItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipmentName: this.props.equipmentName,
            workStatusName: this.props.workStatusName,
            id: this.props.id,
            createDate: this.props.createDate,

        }
    }
    render() {
        return (
            <View style={[styles.itemViewStyle]}>
                <View style={[styles.topStyle]}>
                    <Text style={[styles.topLeftStyle]} numberOfLines={1}>{this.state.equipmentName}</Text>
                    <Text style={[styles.topRightStyle]} numberOfLines={1}>{this.state.workStatusName}</Text>
                </View>

                <View style={[styles.bottomStyle]}>
                    <Text style={[styles.bottomLeftStyle]} numberOfLines={1}>单号{this.state.id}</Text>
                    <Text style={[styles.bottomRightStyle]} numberOfLines={1}>{this.state.createDate}</Text>
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    itemViewStyle: {
        width: AutoUtil.screenWidth(),
        height: AutoUtil.screenWidth() / 5,
        marginTop: 0,
        marginLeft: 0,
        backgroundColor: 'white',
    },
    topStyle: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: AutoUtil.screenWidth() - 20,
        flex: 0.5,
    },
    topLeftStyle: {
        flex: 0.75,
        fontSize: 18,
        color: 'black',
        alignSelf: 'center',
    },
    topRightStyle: {
        flex: 0.25,
        fontSize: 16,
        color: 'black',
        alignSelf: 'center',
        textAlign: 'right',
    },
    bottomStyle: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        flex: 0.5,
        width: AutoUtil.screenWidth() - 20,
        justifyContent: 'space-between',
    },
    bottomLeftStyle: {
        flex: 0.6,
        fontSize: 13,
        color: '#999999',
        alignSelf: 'center',
    },
    bottomRightStyle: {
        flex: 0.4,
        fontSize: 12,
        color: '#999999',
        alignSelf: 'center',
        textAlign: 'right',
    },
})