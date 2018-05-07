/**
 * 系的横线
 */


import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, Dimensions,PixelRatio} from 'react-native'

import color from './color'
var WIDTH = Dimensions.get('window').width;
var ONEPIXEL = 1 / PixelRatio.get();

type Props = {
    style?: any,
}

class Separator extends PureComponent<Props> {
    render() {
        return (
            <View style={[styles.line, this.props.style]} />
        )
    }
}


const styles = StyleSheet.create({
    line: {
        width: WIDTH,
        height: ONEPIXEL,
        backgroundColor: color.bg,
    },
})


export default Separator
