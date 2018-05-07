/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import ApplicationMenuScreen from "./rn/layouts/ibms/ApplicationMenuScreen";
import OtherScreen from "./rn/layouts/ibms/OtherScreen";
import {ToobBar} from './rn/components/Text';
import NavigationItem from "./rn/widget/NavigationItem";
import AutoUtil from "./rn/utils/AutoUtil";
import AlarmNotificationList from "./rn/layouts/ibms/AlarmNotificationList";
import IBMSWorkOrderDel from "./rn/layouts/ibms/IBMSWorkOrderDetail";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

class App extends Component<Props> {
    static navigationOptions = ({navigation}) => ({
        headerTitle: (
            <View style={styles.toolBar}>
                <ToobBar style={styles.searchBar}>应用</ToobBar>
            </View>

        ),
        headerLeft: (
            <NavigationItem
                onPress={() => {
                    //点击
                }}
            />
        ),
        headerRight: (
            <NavigationItem
                onPress={() => {
                    //点击
                }}
            />),
        headerStyle: {
            height: AutoUtil.getHeight(48),
            backgroundColor: '#FFFFFF'
        },
    });

    constructor() {
        super()
        this.state = {
            parameter: '',
        };
        // this.getNode = this.getNode.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to TF!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
                <Button
                    title="Go to Other"
                    onPress={() => this.props.navigation.navigate('ANList')}
                />
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
            </View>
        );
    }
}

const stackNavigator = StackNavigator({
    App: {screen: App},
    ApplicationMenu: {screen: ApplicationMenuScreen},
    Other: {screen: OtherScreen},
    // ANList: {screen: AlarmNotificationList},
    IBMSWorkOrderDel: {screen: IBMSWorkOrderDel},

}, {
    // headerMode: 'none'
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    toolBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: '#000000',
    },
});
export default stackNavigator