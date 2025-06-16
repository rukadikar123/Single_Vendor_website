// src/pages/MyOrders.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/api/orders/my-orders`,
          { withCredentials: true }
        );
        setOrders(res?.data?.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err.message);
      }
    };

    fetchOrders();
  }, []);

  return (
   <>
   <Navbar/>
     <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {orders?.length === 0 ? (
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        orders?.map((order) => (
          <div
            key={order?._id}
            className="border p-4 rounded-lg shadow mb-4 bg-white"
          >
            <p className="font-medium text-gray-800">
              Order ID: {order?._id}
            </p>
            <p>Status: <span className="text-blue-600">{order?.status}</span></p>
            <p>Total: ₹{order?.total}</p>
            <p>Ordered On: {new Date(order?.createdAt).toLocaleString()}</p>

            <div className="mt-2">
              {order?.products?.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{item?.product?.name || "Product removed"}</span>
                  <span>Qty: {item?.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
   </>
  );
};

export default MyOrders;
