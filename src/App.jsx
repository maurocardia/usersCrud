import { Route, Routes, HashRouter } from "react-router-dom";
import UserDetails from "./pages/UserDetails";
import Users from "./pages/Users";
import "./styles/App.css";

function App() {
  return (
    <div className="Users">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:id" element={<Users />} />
          <Route path="/usersDetails/:id" element={<UserDetails />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
