import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state?.cart?.items);

  const totalPrice = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems?.map(item => (
            <div key={item._id} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-green-600 font-bold">₹{item.price * item.quantity}</span>
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-6 border-t pt-4">
            <h2 className="font-semibold text-xl">Total</h2>
            <span className="text-xl font-bold text-green-700">₹{totalPrice}</span>
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
