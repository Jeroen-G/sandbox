import { Stack as RouterStack } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Profile } from '@/components/Avatar/Profile';
import { Image } from '@/components/Image/Image';

const imageHeaderHeight = 100;
const headerPaddingVertical = 20;

export function Avatar() {
    const height = Dimensions.get('window').height;
    const translationY = useSharedValue(0);
    const { top } = useSafeAreaInsets();

    const scrollHandler = useAnimatedScrollHandler(event => {
        translationY.value = event.contentOffset.y;
    });

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                Number(translationY.value),
                [height / 10, height / 2],
                [0, top + imageHeaderHeight + headerPaddingVertical],
                Extrapolation.CLAMP
            ),
            opacity: interpolate(
                translationY.value,
                [height / 3, height / 2],
                [0, 1],
                Extrapolation.CLAMP
            ),
        };
    });

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(
            translationY.value,
            [height / 3, height / 2],
            [0, 1],
            Extrapolation.CLAMP
        );
        const hardSwitch = translationY.value >= height / 2 ? 1 : 0;
        return {
            opacity: Platform.OS === 'android' ? hardSwitch : interpolation,
        };
    });

    return (
        <Animated.ScrollView contentContainerStyle={styles.screen} onScroll={scrollHandler}>
            <RouterStack.Screen
                options={{
                    contentStyle: { backgroundColor: '#fff' },
                    header: () => (
                        <Animated.View
                            style={[
                                styles.animatedHeader,
                                { paddingTop: top },
                                headerAnimatedStyle,
                            ]}>
                            <Animated.View
                                style={[styles.headerImageContainer, imageAnimatedStyle]}>
                                <Image
                                    size={imageHeaderHeight}
                                    source={require('@/assets/albus.gif')}
                                />
                            </Animated.View>
                            <View style={styles.headerTitleContainer}>
                                <Text style={styles.headerTitle}>Albus</Text>
                            </View>
                        </Animated.View>
                    ),
                }}
            />
            <Text style={styles.headerTitle}>Albus</Text>
            <View style={styles.image}>
                <Image size={200} source={require('@/assets/albus.gif')} />
            </View>
            <Profile />
        </Animated.ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 40,
        paddingBottom: 200,
        backgroundColor: '#fff',
        gap: 20,
    },
    image: {
        flex: 1,
        alignItems: 'center',
    },
    animatedHeader: {
        paddingVertical: headerPaddingVertical,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e7e5e4',
    },
    headerImageContainer: { paddingLeft: 50 },
    headerTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: 150,
        justifyContent: 'center',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
    },
});
