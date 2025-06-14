import { Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route element={<ProtectedRoute/>} >
          <Route path="/admin" element={<AdminDashboard/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
