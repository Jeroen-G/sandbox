import { Image as ExpoImage, ImageProps } from 'expo-image';
import React from 'react';

export function Image({ size, style, ...props }: { size: number } & ImageProps) {
    return (
        <ExpoImage style={[{ width: size, height: size }, style]} contentFit="contain" {...props} />
    );
}
