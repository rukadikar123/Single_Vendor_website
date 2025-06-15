import { useDispatch, useSelector } from "react-redux";
import {  clearCart, setCart } from "../redux/cartSlice";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cart?.items);

   const navigate = useNavigate();
  const fetchCart = async () => {
    try {

        const res=await axios.get(`${import.meta.env.VITE_URL}/api/cart`,{withCredentials:true})
        dispatch(setCart(res?.data?.cart))
    } catch (error) {
      console.error("Fetch cart error:", error.message);
      if (error.response?.status === 401) navigate("/login");
    }
  };

  const removeItem=async(productId)=>{
    try {
        
        const res=await axios.delete(`${import.meta.env.VITE_URL}/api/cart/remove/${productId}`,{withCredentials:true})
        dispatch(setCart(res?.data?.cart))
    } catch (error) {
              console.error("Remove item error:", error.message);

    }
  }

  const handleCheckout = () => {
    alert("Checkout successful! (Payment gateway integration pending)");
    handleClearCart();
  };

const handleClearCart=async()=>{
    try {

       await axios.delete(`${import.meta.env.VITE_URL}/api/cart/clear`,{withCredentials:true})
            dispatch(clearCart());
    } catch (error) {
      console.error("Clear cart error:", error.message);

    }
}

  useEffect(()=>{
    fetchCart()
  },[])

  const totalPrice = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Navbar/>
      <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems?.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center p-4 border rounded-lg"
            >
              <div>
                <h2 className="font-semibold">{item.product?.name}</h2>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-green-600 font-bold">
                  ₹{item.product?.price * item.quantity}
                </span>
                <button
                  onClick={() => removeItem(item.product._id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-6 border-t pt-4">
            <h2 className="font-semibold text-xl">Total</h2>
            <span className="text-xl font-bold text-green-700">
              ₹{totalPrice}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded mt-4"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
