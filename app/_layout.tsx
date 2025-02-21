import { Stack } from 'expo-router';
import { setOptions as setSplashScreenOptions } from 'expo-splash-screen';
import React from 'react';

// SplashScreen.preventAutoHideAsync();
setSplashScreenOptions({
    duration: 1000,
    fade: true,
});

export default function RootLayout() {
    return <Stack />;
}
