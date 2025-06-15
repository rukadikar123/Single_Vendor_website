import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import { useSelector } from "react-redux";
import useGetCurrentUser from "./customHooks/useGetCurrentUser";
import CartPage from "./components/CartPage";

function App() {
  useGetCurrentUser();
  const user = useSelector((state) => state?.auth?.user);
  const loading = useSelector((state) => state?.auth?.loading);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
