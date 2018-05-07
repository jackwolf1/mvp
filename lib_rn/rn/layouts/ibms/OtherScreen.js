import React, {Component} from 'react';
import {Button, View, Alert, Text} from 'react-native';

class OtherScreen extends Component<Props> {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => {
                        Alert.alert("我只是一个提示...")
                    }}
                />
            </View>
        );
    }
}

export default OtherScreen