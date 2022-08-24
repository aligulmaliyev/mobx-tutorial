import { makeAutoObservable } from "mobx";
import { createContext, ReactNode, useContext } from "react";
import UserStore from "./UserStore";

export class RootStore {
  usersStore: UserStore;

  constructor() {
    makeAutoObservable(this);
    this.usersStore = new UserStore();
    this.usersStore.load();
  }
}

interface IStoreProviderProps {
  store: RootStore;
  children: ReactNode;
}

export const StoreContext = createContext<RootStore>({} as RootStore);

export const StoreProvider = ({ store, children }: IStoreProviderProps) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

export const useStore = () => {
  return useContext<RootStore>(StoreContext);
};

export default RootStore;
