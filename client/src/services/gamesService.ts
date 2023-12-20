import axios from "axios";
import Game from "../interfaces/Game";

let api = `${process.env.REACT_APP_API}/games`;

export function getGames(params : any) {
  return axios.get(api, {params: params});
}

export function getMyGames() {
  return axios.get(api, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function updateGame(game: Game) {
  return axios.put(api, game, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function getGameById(id: string) {
  return axios.get(`${api}/${id}`);
}

export function getGamesByKeyword(keyword: string) {
  return axios.post(`${api}/search`, keyword);
}

export function getGamesByPage(page: number) {
  return axios.get(`${api}/page/${page}`);
}
