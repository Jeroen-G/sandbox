import { Link } from 'expo-router';
import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import Animated from 'react-native-reanimated';

export default function FirstScreen() {
    return (
        <SafeAreaView>
            <Animated.View
                sharedTransitionTag="sharedTag"
                style={{ width: 150, height: 150, backgroundColor: 'green' }}
            />
            <Text>First Screen</Text>
            <Link href="./second" asChild>
                <Button title="Go on" />
            </Link>
        </SafeAreaView>
    );
}
