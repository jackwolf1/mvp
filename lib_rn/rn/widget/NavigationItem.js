/**
 * Created by yinzhiyu on 11/7/17.
 * 顶部菜单Item样式
 */
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import AutoUtil from '../utils/AutoUtil'
// create a component
class NavigationItem extends PureComponent {
    render() {
        let icon = this.props.icon &&
            <Image style={[styles.icon, this.props.iconStyle]} source={this.props.icon} />

        let title = this.props.title &&
            <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                {icon}
                {title}
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: AutoUtil.getWidth(24),
        height: AutoUtil.getWidth(24),
        margin: AutoUtil.getWidth(4),
        resizeMode: 'center',
    },
    title: {
        fontSize: AutoUtil.getWidth(15),
        color: '#333333',
    }
});

//make this component available to the app
export default NavigationItem;
