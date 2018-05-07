/**
 * Created by yinzhiyu on 18/4/09.
 * 字体的设置
 */
import {
    StyleSheet,
    Text,
} from 'react-native';
import React from 'react';
import ReactElement from 'react-native'
import AutoUtil from "../utils/AutoUtil";

//noinspection JSAnnotator
export function ToobBar({style, ...props}: Object): ReactElement {
    return <Text style={[styles.toolbar, style]} {...props} />
}


const styles = StyleSheet.create({
    toolbar: {
        fontSize: AutoUtil.getWidth(18),
        color: '#DCB883',
    },
});
