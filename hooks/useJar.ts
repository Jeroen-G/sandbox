import { useState } from 'react';

export function useJar<T>(promised: () => Promise<T>) {
    const [promise, setPromise] = useState<Promise<T>>(promised());
    const [refreshing, setRefreshing] = useState(false);

    const refresh = () => {
        setRefreshing(true);
        setPromise(promised());
        setRefreshing(false);
    };

    return { refreshing, refresh, data: promise };
}
