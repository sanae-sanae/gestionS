import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: token },
      });
      setProducts(response.data);
    } catch (err) {
      console.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <ProductForm fetchProducts={fetchProducts} />
        <ProductList products={products} fetchProducts={fetchProducts} />
      </div>
    </div>
  );
}

export default AdminDashboard;