import { useNetworkState } from 'expo-network';
import { useCallback, useEffect, useState, useTransition } from 'react';

import { useJarCache } from '@/hooks/useJarCache';

export type Jar<T> = {
    isRefreshing: boolean;
    refresh: () => void;
    data: Promise<T>;
};

export function useJar<T>(promised: () => Promise<T>, initialData?: T): Jar<T> {
    const [isPending, startTransition] = useTransition();
    const [promise, setPromise] = useState<Promise<T>>(new Promise(() => {}));
    const cacheJar = useJarCache<T>(initialData ?? ({} as T));
    const networkState = useNetworkState();

    const refresh = useCallback(() => {
        if (isPending) {
            return;
        }

        if (!networkState.isInternetReachable) {
            return cacheJar.getData();
        }

        startTransition(() => {
            setPromise(
                promised().then(async data => {
                    await cacheJar.storeData(data);
                    return data;
                })
            );
        });
    }, [cacheJar, isPending, networkState, promised]);

    useEffect(() => {
        if (initialData) {
            setPromise(Promise.resolve(initialData));
        } else {
            refresh();
        }
    }, []);

    return { isRefreshing: isPending, refresh, data: promise };
}
