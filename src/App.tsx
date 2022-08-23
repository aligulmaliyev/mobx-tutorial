import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import UserList from "./pages/UserList";
import AddOrUpdate from "./pages/UserList/AddOrUpdate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" />} />
      <Route path="users">
        <Route index element={<UserList />} />
        <Route path=":id" element={<AddOrUpdate />} />
      </Route>
    </Routes>
  );
}

export default App;
