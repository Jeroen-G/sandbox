export type Book = {
    title: string;
};

type BookResponse = {
    attributes: {
        title: string;
    };
};

export async function promisedBooks(): Promise<Book[]> {
    console.log('calling promisedBooks');
    const fallback = [{ title: 'Stone' }, { title: 'Chamber' }, { title: 'Azkaban' }];

    return new Promise(resolve => setTimeout(() => resolve(fallback), 5000));
    // return new Promise((_, reject) => setTimeout(() => reject('whoops'), 1000));

    const response = await fetch('https://api.potterdb.com/v1/books');
    if (response.status === 429) {
        throw new Error('Too many requests!');
    }
    if (!response.ok) {
        throw new Error('Avada Kedavra!');
    }

    const data = await response.json();

    return data.data.map(
        (book: BookResponse) =>
            ({
                title: book.attributes.title,
            }) satisfies Book
    );
}
