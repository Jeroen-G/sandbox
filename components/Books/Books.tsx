import React, { use } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Book } from '@/components/Books/promisedBooks';

type Props = {
    promisedBooks: Promise<Book[]>;
    books?: Book[];
};

export function Books({ promisedBooks }: Props) {
    const books = use(promisedBooks);

    return (
        <View style={styles.screen}>
            {books && books.map((book, index) => <Text key={index}>{book.title}</Text>)}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
});
