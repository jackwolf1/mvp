import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';

class ApplicationMenuScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Other')}
                />
            </View>
        );
    }
}

export default ApplicationMenuScreen