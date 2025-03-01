import { useHeaderHeight } from '@react-navigation/elements';
import { Stack as RouterStack } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Image } from '@/components/Avatar/Image';
import { Profile } from '@/components/Avatar/Profile';

const imageHeaderHeight = 100;
const headerPaddingVertical = 20;

export function Avatar() {
    const height = Dimensions.get('window').height;
    const translationY = useSharedValue(0);
    const { top } = useSafeAreaInsets();
    const headerHeight = useHeaderHeight();

    const scrollHandler = useAnimatedScrollHandler(event => {
        translationY.value = event.contentOffset.y;
    });

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                Number(translationY.value),
                [height / 10, height / 2],
                [0, headerHeight + top + imageHeaderHeight + headerPaddingVertical],
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
                            <View style={styles.headerImageContainer}>
                                <Image size={imageHeaderHeight} />
                            </View>
                            <View style={styles.headerTitleContainer}>
                                <Text style={styles.headerTitle}>Albus</Text>
                            </View>
                        </Animated.View>
                    ),
                }}
            />
            <Text style={styles.headerTitle}>Albus</Text>
            <View style={styles.image}>
                <Image size={200} />
            </View>
            <Profile />
        </Animated.ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 40,
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
