import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { Details } from '@/components/Avatar/Profile';
import { useApi } from '@/hooks/useApi';

const toDetails = (data: { data: { attributes: Details } }): Details => {
    const details = data.data.attributes;

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

export function useAlbus() {
    const { fetcher } = useApi(toDetails);
    const { data, isLoading, mutate } = useSWR(
        'https://api.potterdb.com/v1/characters/6aaf667f-246f-486d-90c8-4424651a92bb',
        fetcher
    );

    return {
        myProfile: data,
        isRefreshing: isLoading,
        refresh: mutate,
    };
}

export function usePostAlbus() {
    const { updater } = useApi<{ name: string }, { name: string }, { data: { name: string } }>(
        jsonData => {
            console.log(jsonData.data);
            return { name: jsonData.data.name };
        }
    );
    const { trigger, isMutating, error } = useSWRMutation('https://httpbin.org/anything', updater);

    return { trigger, isRefreshing: isMutating, error };
}
