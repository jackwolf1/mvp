import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AutoUtil from "../../utils/AutoUtil";

export default class IBMSProjectListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipmentName: this.props.equipmentName,
            alarmCount: this.props.alarmCount,
            alarmSubSystemName: this.props.alarmSubSystemName,
            alarmCategoryName: this.props.alarmCategoryName,
            alarmLastOccureTime: this.props.alarmLastOccureTime,

        }
    }
    render() {
        return (
            <View style={[styles.itemViewStyle]}>
                <View style={[styles.topStyle]}>
                    <Text style={[styles.topLeftStyle]} numberOfLines={1}>{this.state.equipmentName}</Text>
                    <View style={[styles.topRightViewStyle]}>
                    <Text style={[styles.topRightNumStyle]} numberOfLines={1}>{this.state.alarmCount}</Text>
                    <Text style={[styles.topRightTextStyle]} numberOfLines={1}>次警告</Text>
                    </View>
                    
                </View>

                <View style={[styles.bottomStyle]}>
                    <View style={[styles.bottomLeftViewStyle]}>
                        <Text style={[styles.bottomLeftStyle]} numberOfLines={1}>一般</Text>
                        <Text style={[styles.bottomCenterStyle]} numberOfLines={1}>{this.state.alarmSubSystemName}-{this.state.alarmCategoryName}</Text>
                    </View>
                    <Text style={[styles.bottomRightStyle]} numberOfLines={1}>{this.state.alarmLastOccureTime}</Text>
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
    topRightViewStyle: {
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    topRightNumStyle: {
        fontSize: 16,
        color: 'red',
        alignSelf: 'center',
    },
    topRightTextStyle: {
        fontSize: 16,
        color: 'black',
        alignSelf: 'center',
    },
    bottomStyle: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        flex: 0.5,
        width: AutoUtil.screenWidth() - 20,
        justifyContent: 'space-between',
    },
    bottomLeftViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomLeftStyle: {
        fontSize: 12,
        color: 'white',
        alignSelf: 'center',
        backgroundColor: 'red',
        borderRadius: 2,
        overflow: 'hidden',
    },
    bottomCenterStyle: {
        fontSize: 13,
        marginLeft: 5,
        color: '#999999',
        alignSelf: 'center',
    },
    bottomRightStyle: {
        fontSize: 12,
        color: '#999999',
        alignSelf: 'center',
    },
})