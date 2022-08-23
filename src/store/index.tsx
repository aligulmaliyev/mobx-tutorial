import { createContext, useContext } from "react";
import Users from "./Users";

const store = {
  userStore: Users,
};

export const StoreContext = createContext(store);
export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

export default store;
