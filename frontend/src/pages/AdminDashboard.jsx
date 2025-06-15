import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { setError, setProducts } from "../redux/productSlice";
import { setLoading } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/products/all`,
        { withCredentials: true }
      );
      dispatch(setProducts(res?.data?.products));
    } catch (error) {
      console.error("Fetch products error:", error.message);
      dispatch(setError("Failed to load products"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      if (form.image) formData.append("image", form.image);
      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_URL}/api/products/${editId}`,
          formData,
          { withCredentials: true },
          {
            headers: {
              "Content-Type": "multipart/form-data", // ✅ Required for FormData
            },
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_URL}/api/products/create`,
          formData,
          { withCredentials: true },
          {
            headers: {
              "Content-Type": "multipart/form-data", // ✅ Required for FormData
            },
          }
        );
      }

      setForm({ name: "", description: "", price: "", image: null });
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.error("Submit error:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/api/products/${id}`, {
        withCredentials: true,
      });
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: null, // for security, do not prefill file input
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        {/* Product Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="w-full border p-2 rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full border p-2 rounded"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editId ? "Update Product" : "Create Product"}
          </button>
        </form>

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-4 rounded-lg shadow-sm">
              <div className="relative w-full h-48 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute w-full h-full object-contain"
                />
              </div>
              <h2 className="text-lg font-semibold mt-2">{p.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {p.description}
              </p>
              <p className="text-green-600 font-bold mt-1">₹{p.price}</p>
              <p className="text-sm text-gray-500">Stock: {p.stock}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-blue-500 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
