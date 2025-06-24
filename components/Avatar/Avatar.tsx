import { Stack as RouterStack } from 'expo-router';
import React, { Suspense } from 'react';
import {
    ActivityIndicator,
    Button,
    Dimensions,
    Platform,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { Details, Profile } from '@/components/Avatar/Profile';
import { Image } from '@/components/Image/Image';

const imageHeaderHeight = 100;
const headerPaddingVertical = 20;

const fetcher = async (
    resource: string | Request,
    init: RequestInit | undefined
): Promise<Details> => {
    const res = await fetch(resource, init);
    const data = await res.json();
    const details = data.data.attributes;

    console.log('FETCHER!');

    return {
        name: details.name,
        born: details.born,
        died: details.died,
        family_members: details.family_members,
        house: details.house,
        wands: details.wands,
        patronus: details.patronus,
        titles: details.titles,
        jobs: details.jobs,
    };
};

async function sendRequest(url: string, { arg }: { arg: { name: string } }) {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(arg),
    });

    const data = await res.json();

    console.log('POSTED!', data.data);

    // throw new Error('OH NO');
}

export function Avatar() {
    const height = Dimensions.get('window').height;
    const translationY = useSharedValue(0);
    const { top } = useSafeAreaInsets();
    const {
        data: myProfile,
        isLoading: refreshing,
        mutate: refresh,
    } = useSWR(
        'https://api.potterdb.com/v1/characters/6aaf667f-246f-486d-90c8-4424651a92bb',
        fetcher
    );

    const { trigger, isMutating, error } = useSWRMutation(
        'https://httpbin.org/anything',
        sendRequest
    );

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

    if (!myProfile) {
        return null;
    }

    if (error) {
        throw error;
    }

    return (
        <Animated.ScrollView
            contentContainerStyle={styles.screen}
            onScroll={scrollHandler}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
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
            <Suspense fallback={<ActivityIndicator />}>
                <Button
                    title="POST"
                    disabled={isMutating}
                    onPress={async () => {
                        await trigger({ name: myProfile?.name ?? 'none' });
                    }}
                />
                <Profile details={myProfile} />
            </Suspense>
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
