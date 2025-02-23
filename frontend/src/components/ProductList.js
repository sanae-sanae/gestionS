import React from "react";
import axios from "axios";

function ProductList({ products, fetchProducts }) {
  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: token },
      });
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-700 p-4 rounded-lg shadow-lg flex flex-col"
          >
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.name}
              className="w-full h-40 object-cover mb-4"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>Stock: {product.stock}</p>
            <div className="flex mt-4">
              <button
                className="bg-green-500 hover:bg-green-600 py-1 px-4 rounded text-white mr-2"
                onClick={() => alert("Edit function not implemented yet")}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 py-1 px-4 rounded text-white"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;