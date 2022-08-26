import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import UserList from "../pages/UserList";
import PageLayout from "../layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" />} />
      <Route path="users" element={<PageLayout/>}>
        <Route index element={<UserList />} />
      </Route>
    </Routes>
  );
}

export default App;
