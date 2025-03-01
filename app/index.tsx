import { Link } from 'expo-router';
import React from 'react';
import { Button, View } from 'react-native';

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Link href="/avatar" asChild>
                <Button title="Avatar animating on scroll" />
            </Link>
        </View>
    );
}
