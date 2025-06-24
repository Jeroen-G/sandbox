import { Stack } from 'expo-router';
import React from 'react';
import { SWRConfig } from 'swr';

export default function AvatarLayout() {
    return (
        <SWRConfig value={{ suspense: true }}>
            <Stack screenOptions={{ headerShown: true }} />
        </SWRConfig>
    );
}
