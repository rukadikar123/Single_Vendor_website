import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice";
import axios from "axios";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    try {

        const res=await axios.post(`${import.meta.env.VITE_URL}/api/cart/add`,{productId: product._id},{withCredentials:true})
      alert("cart added successfully")
        dispatch(setCart(res?.data?.cart))

    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  return (
    <div className="border p-4 rounded-2xl shadow hover:shadow-lg transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain bg-white rounded-lg"
      />
      <h2 className="mt-2 font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-500 text-sm">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold text-green-600">
          ₹{product.price}
        </span>
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
