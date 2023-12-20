export default interface User {
  userName: string;
  email: string;
  password: string;
  age?: number;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  images: {
    imgURL: string;
    imgALT: string;
  };
  games: string[];
  favGames: string[];
  carts: string[];
  isAdmin: boolean;
}
