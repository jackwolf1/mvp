import React, { Component, PropTypes } from "react";
import { View, Image, Text, StyleSheet } from 'react-native';
import AutoUtil from '../../utils/AutoUtil';

export default class FlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageUrl: this.props.ImageUrl,
            Title: this.props.Title,
            Num: this.props.Num,
        }
    }

    render() {
        return (
            <View style={[styles.itemStyle]}>
                <View style={{ flexDirection: 'row' }}>
                    {
                        this.state.Num == '0' ? (
                            <View style={[styles.image]}>
                                <Image
                                    style={{ width: 49, height: 49 }}
                                    source={{ uri: this.state.ImageUrl }}
                                />
                            </View>
                        ) : (
                                <View style={[styles.imageAndNum]}>
                                    <Image
                                        style={{ width: 49, height: 49 }}
                                        source={{ uri: this.state.ImageUrl }}
                                    />
                                </View>
                            )
                    }
                    {
                        this.state.Num == '0' ? (
                            null
                        ) : (
                                <View style={[styles.numViewStyle]}>
                                    <Text style={[styles.numStyle]}>{this.state.Num}</Text>
                                </View>
                            )
                    }
                </View>
                <View style={[styles.textViewStyle, this.props.TextBackColor]}>
                    <Text style={[styles.textStyle]}>{this.state.Title}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    itemStyle: {
        height: (AutoUtil.screenWidth() - 1.5) / 3 * 123 / 125,
        width: (AutoUtil.screenWidth() - 1.5) / 3 * 124 / 125,
        backgroundColor: 'white',
        borderColor: '#dddddd',
        borderWidth: 0.2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageAndNum: {
        width: 49,
        height: 49,
        borderRadius: 49 / 2,
        overflow: 'hidden',
        backgroundColor: '#dddddd',
        alignSelf: 'center',
        right: -8,
        paddingRight: 25,
    },
    image: {
        width: 49,
        height: 49,
        borderRadius: 49 / 2,
        overflow: 'hidden',
        backgroundColor: '#dddddd',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    textViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },
    textStyle: {
        alignItems: 'center',
    },
    flatStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    numViewStyle: {
        height: 16,
        width: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#ff5252',
    },
    numStyle: {
        fontSize: 10,
        color: '#ffffff',
    }
});