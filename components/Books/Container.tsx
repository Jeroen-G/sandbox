import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Suspense, useCallback } from 'react';
import { ActivityIndicator, Button } from 'react-native';

import { Book, promisedBooks } from './promisedBooks';

import { Books } from '@/components/Books/Books';
import { useJar } from '@/hooks/useJar';

export function Container() {
    const initial = [{ title: 'nothing loaded' }];
    const { data, refresh, isRefreshing } = useJar<Book[]>(promisedBooks, initial);

    const clear = useCallback(async () => {
        await AsyncStorage.clear();
    }, []);

    const log = useCallback(async () => {
        await AsyncStorage.getItem('my-key', console.log);
    }, []);

    return (
        <>
            <Suspense fallback={<ActivityIndicator />}>
                <Books promisedBooks={data} />
            </Suspense>
            <Button title="Refresh" onPress={refresh} disabled={isRefreshing} />
            <Button title="Clear AsyncStorage" onPress={clear} disabled={isRefreshing} />
            <Button title="Log AsyncStorage" onPress={log} disabled={isRefreshing} />
        </>
    );
}
