import { Link } from 'expo-router';
import { Href } from 'expo-router/build/typed-routes/types';
import React from 'react';
import { Button, View } from 'react-native';

const menu: Array<{ link: Href; title: string }> = [
    {
        link: '/apiroutes',
        title: 'API Routes and fuzzy search',
    },
    {
        link: '/avatar',
        title: 'Avatar animating on scroll',
    },
    {
        link: '/buttons',
        title: 'Morphing buttons',
    },
    {
        link: '/_sitemap',
        title: 'Sitemap',
    },
];

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            {menu.map((item, i) => (
                <Link key={i} href={item.link} asChild>
                    <Button title={item.title} />
                </Link>
            ))}
        </View>
    );
}
