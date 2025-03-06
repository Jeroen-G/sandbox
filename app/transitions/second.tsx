import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import Animated from 'react-native-reanimated';

export default function SecondScreen() {
    return (
        <SafeAreaView>
            <Animated.View
                sharedTransitionTag="sharedTag"
                style={{ width: 100, height: 100, backgroundColor: 'red' }}
            />
            <Text>Second Screen</Text>
        </SafeAreaView>
    );
}
