import React, { useState } from "react";
import axios from "axios";

function ProductForm({ fetchProducts }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      fetchProducts();
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImage(null);
    } catch (err) {
      console.error("Failed to add product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-green-500 hover:bg-green-600 py-2 px-4 rounded text-white font-bold"
      >
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;