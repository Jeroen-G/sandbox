const DB_ENDPOINT = 'https://api.potterdb.com/v1/spells';

export type Spell = {
    category: string;
    image: string;
    name: string;
    incantation: string;
    effect: string;
};

type ApiResponse = {
    data: Array<{ attributes: Spell }>;
};

export async function GET(request: Request) {
    const url = new URL(request.url);
    const searchText = url.searchParams.get('searchText');

    if (!searchText) {
        return Response.json([]);
    }

    const queryNames = await fetch(`${DB_ENDPOINT}?filter[name_cont]=${searchText}`);
    const spellsByName: ApiResponse = await queryNames.json();
    const queryEffects = await fetch(`${DB_ENDPOINT}?filter[effect_cont]=${searchText}`);
    const spellsByEffect: ApiResponse = await queryEffects.json();

    const spells = [
        ...spellsByName.data.map(spell => spell.attributes),
        ...spellsByEffect.data.map(spell => spell.attributes),
    ];

    return Response.json(spells);
}
