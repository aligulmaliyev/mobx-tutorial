import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import RootStore, { StoreProvider } from "./store";
import "antd/dist/antd.css";
import App from "./App/App";
import "./index.css";

const store = new RootStore();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StoreProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>
);
