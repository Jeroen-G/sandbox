import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Spell } from '@/app/apiroutes/spells+api';
import { Image } from '@/components/Image/Image';

export function SpellItem({ spell }: { spell: Spell }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={spell.image} size={50} style={styles.image} contentFit="fill" />
            </View>
            <View style={styles.texts}>
                <View style={styles.row}>
                    <FontAwesome6 name="wand-sparkles" size={12} color="#fbbf24" />
                    <Text style={styles.name}>{spell.name}</Text>
                </View>
                <View style={styles.meta}>
                    {spell.incantation && (
                        <Text style={styles.incantation}>{spell.incantation}</Text>
                    )}
                    <Text style={styles.effect}>{spell.effect}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
    },
    imageContainer: {
        justifyContent: 'center',
    },
    image: {
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 100,
    },
    texts: {
        gap: 6,
        width: '75%',
    },
    meta: {
        gap: 6,
        borderStartWidth: 3,
        borderColor: '#e2e8f0',
        paddingLeft: 6,
        marginLeft: 3,
    },
    name: {
        color: '#1e293b',
        fontWeight: 'bold',
        fontSize: 16,
    },
    incantation: {
        color: '#475569',
        fontSize: 14,
    },
    effect: {
        color: '#94a3b8',
        fontStyle: 'italic',
        fontSize: 12,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
});
