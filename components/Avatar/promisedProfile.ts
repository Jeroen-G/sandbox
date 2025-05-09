export async function promisedProfile() {
    const response = await fetch(
        'https://api.potterdb.com/v1/characters/6aaf667f-246f-486d-90c8-4424651a92bb'
    );
    if (response.status === 429) {
        throw new Error('Too many requests!');
    }
    if (!response.ok) {
        throw new Error('Avada Kedavra!');
    }

    const data = await response.json();
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
}
