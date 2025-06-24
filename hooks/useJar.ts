import { useNetworkState } from 'expo-network';
import { useCallback, useEffect, useState, useTransition } from 'react';

import { useJarCache } from '@/hooks/useJarCache';

export type Jar<T> = {
    isRefreshing: boolean;
    refresh: () => void;
    data: Promise<T>;
};

type PromisedType<T, A> = (() => Promise<T>) | ((args: A) => Promise<void>);

export function useJar<T, A = unknown>(promised: () => Promise<T>, initialData?: T): Jar<T> {
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
        (async () => {
            if (await cacheJar.hasData()) {
                setPromise(cacheJar.getData());
            }
            return;
        })();

        if (initialData) {
            setPromise(Promise.resolve(initialData));
            return;
        }

        refresh();
    }, []);

    return { isRefreshing: isPending, refresh, data: promise };
}
