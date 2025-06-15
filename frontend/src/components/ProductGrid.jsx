import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/api/products/all`)
      .then(res => {
        console.log(res);
        
        setProducts(res?.data?.products)
    })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
