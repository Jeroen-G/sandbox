import { ErrorBoundaryProps } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { Avatar } from '@/components/Avatar/Avatar';

/** @see https://docs.expo.dev/router/error-handling/ */
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
    return (
        <View style={{ flex: 1, backgroundColor: 'red' }}>
            <Text>{error.message}</Text>
            <Text onPress={retry}>Try Again?</Text>
        </View>
    );
}

export default function AvatarScreen() {
    return (
        <SafeAreaView>
            <Avatar />
        </SafeAreaView>
    );
}
