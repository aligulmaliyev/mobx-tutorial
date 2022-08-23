import { IUser } from "../models/User";
import { api } from "./api";
const USER_API = api + "users";

class UserService {
  getList = async (query: string) => {
    const options = {
      method: "GET",
    };
    const request = new Request(USER_API + "?" + query, options);
    const response = await fetch(request);
    return response.json();
  };
  get = async (id: number) => {
    const options = {
      method: "GET",
    };
    const request = new Request(USER_API + "/" + id, options);
    const response = await fetch(request);
    return response.json();
  };
  post = async (user: IUser) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    var options = {
      method: "POST",
      headers,
      body: JSON.stringify(user),
    };
    const request = new Request(USER_API, options);
    const response = await fetch(request);
    return response;
  };
  put = async (user: IUser) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    var options = {
      method: "PUT",
      headers,
      body: JSON.stringify(user),
    };
    const request = new Request(USER_API + `/${user.id}`, options);
    const response = await fetch(request);
    return response;
  };
  delete = async (id: number) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method: "DELETE",
      headers,
    };
    const request = new Request(USER_API + "/" + id, options);
    const response = await fetch(request);
    return response;
  };
}

export default UserService;
