import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Details = {
    name: string;
    patronus: string;
    born: string;
    died: string;
    house: string;
    titles: string[];
    family_members: string[];
    jobs: string[];
    wands: string[];
};

function Card({ title, text }: { title: string; text: string | string[] }) {
    const textAsArray = typeof text === 'string' ? [text] : text;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            {textAsArray.map((t, i) => (
                <Text key={i}>{t}</Text>
            ))}
        </View>
    );
}

export function Profile() {
    const [details, setDetails] = useState<Details>();

    useEffect(() => {
        void (async () => {
            const data = await fetch(
                'https://api.potterdb.com/v1/characters/a57de83d-2a44-40d4-8060-75895fa756f5'
            );

            const details: Details = (await data.json())['data']['attributes'];

            setDetails({
                name: details.name,
                born: details.born,
                died: details.died,
                family_members: details.family_members,
                house: details.house,
                wands: details.wands,
                patronus: details.patronus,
                titles: details.titles,
                jobs: details.jobs,
            });
        })();
    }, []);

    return (
        <View style={styles.list}>
            {details &&
                Object.keys(details).map((title, index) => (
                    <Card key={index} title={title} text={details[title as keyof Details]} />
                ))}
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        gap: 10,
        width: '100%',
    },
    card: {
        backgroundColor: '#ffedd5',
        color: '#626366',
        borderRadius: 10,
        padding: 20,
        width: '100%',
    },
    title: { fontWeight: 'bold' },
});
