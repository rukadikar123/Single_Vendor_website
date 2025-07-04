import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading, setUser } from '../redux/authSlice';

function Signup() {
   const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/api/auth/register`, form, {withCredentials:true});
      console.log(res);
      
      dispatch(setUser(res?.data?.user));
      dispatch(setLoading(false))
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed");
      dispatch(setLoading(false))
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="mb-3 p-2 w-full border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-3 p-2 w-full border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-3 p-2 w-full border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Create Account
        </button>
        <p className='mt-4'>Already have an Account <span className='text-blue-400 cursor-pointer' onClick={()=>navigate('/login')}>Login</span></p>
      </form>
    </div>
  )
}

export default Signup