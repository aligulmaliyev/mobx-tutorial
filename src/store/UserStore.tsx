import { makeAutoObservable, runInAction } from "mobx";
import { IUser, IUserFilter } from "../models/User";
import UserService from "../services/UserService";
import { filterQueryResolver } from "../utils/filterQueryResolver";
import { BaseStore } from "./BaseStore";

class UserStore implements BaseStore {
  userService: UserService;
  users: IUser[] = [];
  user!: IUser;
  count: number = 0;
  status: string = "initial";
  filters: IUserFilter = {};

  constructor() {
    this.userService = new UserService();
    makeAutoObservable(this);
  }
  load(
    filters: IUserFilter = {
      _page: 1,
      _limit: 8,
    }
  ) {
    this.filters = { ...this.filters, ...filters };
    this.getUsersAsync(this.filters);
    this.getUsersCountAsync();
  }

  getLocaleAddOrDelete = (user: IUser, cancel: boolean = false) => {
    if (!cancel) {
      runInAction(() => {
        this.users = [user, ...this.users];
      });
    }
    if (cancel) {
      runInAction(() => {
        const newUsers = this.users.filter((user) => user.id !== -1);
        this.users = newUsers;
      });
    }
  };

  getUsersCountAsync = async () => {
    try {
      const data = await this.userService.getList();
      runInAction(() => {
        this.count = data?.length;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };

  getUsersAsync = async (filters?: IUserFilter) => {
    try {
      const query = filterQueryResolver(filters);
      const data = await this.userService.getList(query);
      runInAction(() => {
        this.users = data;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
  getUserAsync = async (id: number) => {
    try {
      const data = await this.userService.get(id);
      runInAction(() => {
        this.user = data;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
  createUserAsync = async (user: IUser) => {
    try {
      const response = await this.userService.post(user);
      if (response.status === 201) {
        runInAction(() => {
          this.status = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
  updateUserAsync = async (user: IUser) => {
    try {
      const response = await this.userService.put(user);
      if (response.status === 200) {
        runInAction(() => {
          this.status = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
  deleteUserAsync = async (id: number) => {
    try {
      const response = await this.userService.delete(id);
      if (response.status === 204) {
        runInAction(() => {
          this.status = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
}

export default UserStore;
