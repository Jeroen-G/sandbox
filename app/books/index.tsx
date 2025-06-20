import React, { Suspense } from 'react';
import { SafeAreaView, Text } from 'react-native';

import { Books } from '@/components/Books';

export default function BooksScreen() {
    return (
        <SafeAreaView>
            <Suspense fallback={<Text>Loading root...</Text>}>
                <Books />
            </Suspense>
        </SafeAreaView>
    );
}
