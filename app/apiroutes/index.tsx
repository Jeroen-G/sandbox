import { Stack } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { Spell } from '@/app/apiroutes/spells+api';
import { SpellItem } from '@/components/Spell/SpellItem';
import { useDebounce } from '@/hooks/useDebounce';

export default function ApiRoutes() {
    const [value, setValue] = useState('');
    const [spells, setSpells] = useState<Spell[]>([]);
    const debouncedValue = useDebounce(value, 200);

    const updateList = useCallback(async (searchText: string) => {
        const endpoint = '/apiroutes/spells?searchText=' + encodeURIComponent(searchText);
        const response = await fetch(endpoint);
        setSpells(await response.json());
    }, []);

    const renderItem = useCallback(({ item }: { item: Spell }) => <SpellItem spell={item} />, []);

    useEffect(() => {
        if (debouncedValue.length > 1) {
            void updateList(debouncedValue);
        }
    }, [debouncedValue, updateList]);

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: 'Book of Spells',
                    headerSearchBarOptions: {
                        placeholder: 'Search spell',
                        obscureBackground: true,
                        onChangeText: e => setValue(e.nativeEvent.text),
                        onCancelButtonPress: () => setSpells([]),
                    },
                }}
            />
            <FlatList
                data={spells}
                renderItem={renderItem}
                style={styles.container}
                contentContainerStyle={styles.innerContainer}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        height: '100%',
    },
    innerContainer: {
        gap: 20,
    },
});
