import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { ZoomInRotate, ZoomOutRotate } from 'react-native-reanimated';

function Play() {
    return <FontAwesome5 name="play" size={50} color="#008c32" />;
}

function Pause() {
    return <FontAwesome5 name="pause" size={50} color="#008c32" />;
}

export function Morphing() {
    const [buttons, setButtons] = useState([Play]);
    const [isPlaying, setIsPlaying] = useState(false);

    const onPressButton = () => {
        setButtons(isPlaying ? [Pause] : [Play]);
        setIsPlaying(!isPlaying);
    };

    return (
        <View style={styles.screen}>
            <Pressable onPress={onPressButton} style={styles.button}>
                <Animated.View>
                    {buttons.map(Element => (
                        <Animated.View
                            key={Element.name}
                            entering={ZoomInRotate.duration(300)}
                            exiting={ZoomOutRotate.duration(200)}>
                            <Element />
                        </Animated.View>
                    ))}
                </Animated.View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: 120,
        borderRadius: 12,
        borderWidth: 4,
        borderColor: '#008c32',
    },
});
