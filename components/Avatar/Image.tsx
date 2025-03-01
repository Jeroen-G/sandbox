import { Image as ExpoImage } from 'expo-image';
import React from 'react';

export function Image({ size }: { size: number }) {
    return (
        <ExpoImage
            source={require('@/assets/albus.gif')}
            style={{ width: size, height: size }}
            contentFit="contain"
        />
    );
}
