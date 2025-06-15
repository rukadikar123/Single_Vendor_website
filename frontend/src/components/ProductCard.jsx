import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 rounded-2xl shadow hover:shadow-lg transition duration-300">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
      <h2 className="mt-2 font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-500 text-sm">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold text-green-600">₹{product.price}</span>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
