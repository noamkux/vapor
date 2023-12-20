import axios from "axios";
import User from "../interfaces/User";
import { jwtDecode } from "jwt-decode";

let api = `${process.env.REACT_APP_API}/users`;

export function register(user: User) {
  return axios.post(`${process.env.REACT_APP_API}/register`, user);
}
export function login(user: User) {
  return axios.post(api, user);
}

export function getAllUsers() {
  return axios.get(api, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}
export function getUserByid(id: number) {
  return axios.get(`${api}/${id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as any)
    },
  });
}
export function updateUserById(userId: number, updatedUser: User) {
  return axios.put(`${api}/${userId}`, updatedUser, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function deleteUser(idToDelete: number) {
  return axios.delete(`${api}/${idToDelete}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function getTokenDetails() {
  let token =(sessionStorage.getItem("token") as any);

  return jwtDecode(token);
}
