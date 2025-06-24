export function useApi<T, A = T, R = unknown>(transformer: (json: R) => T) {
    return {
        fetcher: async (resource: string | Request, init: RequestInit | undefined) => {
            console.log('FETCHER!');
            const res = await fetch(resource, init);
            return transformer(await res.json());
        },

        updater: async (url: string, { arg }: { arg: A }) => {
            console.log('UPDATER!');
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(arg),
            });
            return transformer(await res.json());
        },
    };
}
