import React, { Suspense } from 'react';
import { ActivityIndicator, Button } from 'react-native';

import { Book, promisedBooks } from './promisedBooks';

import { Books } from '@/components/Books/Books';
import { useJar } from '@/hooks/useJar';

export function Container() {
    const initial = [{ title: 'nothing loaded' }];
    const { data, refresh, isRefreshing } = useJar<Book[]>(promisedBooks, initial);

    return (
        <>
            <Suspense fallback={<ActivityIndicator />}>
                <Books promisedBooks={data} />
            </Suspense>
            <Button title="Refresh" onPress={refresh} disabled={isRefreshing} />
        </>
    );
}
