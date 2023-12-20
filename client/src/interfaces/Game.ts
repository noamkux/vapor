export default interface Game {
    _id: string;
    name: string;
    release_date: Date;
    developer: string;
    publisher: string;
    platforms: string;
    required_age: number;
    price: number;
    type: {
        genres: Array<string>;
        steamspy_tags: Array<string>;
        categories: Array<string>;
    };
    stats: {
        positive_ratings: number;
        negative_ratings: number;
        owners: string;
        average_playtime: number;
    };
    description: {
        _id: string;
        detailed_description: string;
        about_the_game: string;
        short_description: string;
    };
    media: {
        _id: string;
        header_image: string;
        screenshots: [
            {
                id: number;
                path_full: string;
                path_thumbnail: string;
            }
        ]
        background: string;
        movies: string | null;
    };
}