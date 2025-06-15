import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoading, setUser } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice";

export default function Navbar() {
  const cartItems = useSelector((state) => state?.cart?.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const user = useSelector((state) => state?.auth?.user);

  const navigate = useNavigate();
    const dispatch=useDispatch()

  const handleLogout = async() => {
    try {
        await axios.get(`${import.meta.env.VITE_URL}/api/auth/logout`,{withCredentials:true})
        
        dispatch(setUser(null))
        dispatch(setLoading(false))
        dispatch(clearCart())
        
      navigate("/login");
    } catch (error) {
      console.error(" handleLogout error:", error.message);
    }
  };

  const goToAdminDashboard = () => {
    navigate("/admin");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-blue-600">
        E-Shop
      </Link>
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-sm font-medium text-gray-600 hover:text-blue-600"
        >
          Home
        </Link>
        <Link
          to="/cart"
          className="relative text-sm font-medium text-gray-600 hover:text-blue-600"
        >
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
        {user?.role === "admin" && (
          <button
            onClick={goToAdminDashboard}
            className="text-sm font-medium text-purple-600 hover:underline"
          >
            Admin Dashboard
          </button>
        )}

        {!user ? (
          <Link
            to="/login"
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Login
          </Link>
        ) : (
          <>
            <span className="text-sm text-gray-600">Hi, {user.username}</span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
