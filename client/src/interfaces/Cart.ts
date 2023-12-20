export default interface Cart {
    user_id: string;
    games: string[]; // assuming the ObjectId is represented as a string
    total: number;
    active: boolean;
    dateUpdated: string;
}