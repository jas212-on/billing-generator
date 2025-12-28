import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Menu,
  Search,
  Loader,
  Loader2,
} from "lucide-react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsProductsLoading(true);
        const response = await axiosInstance.get("/products/get-products");
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    console.log(formData);
    try {
      setLoading(true);
      if (formData.name && formData.price) {
        if (editingId) {
          await axiosInstance.put(
            `/products/update-product/${editingId}`,
            formData
          );
          setProducts(
            products.map((p) =>
              p._id === editingId ? { ...formData, _id: editingId } : p
            )
          );
          setEditingId(null);
        } else {
          const response = await axiosInstance.post(
            "/products/add-product",
            formData
          );
          setProducts([
            ...products,
            { ...formData, _id: response.data._id.toString() },
          ]);
        }
      }else{
        toast.error("Please fill all the fields");
      }
    } catch (error) {
      toast.error("Failed to add product");
      console.log(error);
    } finally {
      setLoading(false);
    }

    setFormData({ name: "", price: null });
  };

  const handleEdit = (product, id) => {
    setFormData({
      name: product.name,
      price: product.price,
    });
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      setIsDeleteLoading(true);
      await axiosInstance.delete(`/products/delete-product/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
      setDeletingId(null);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", price: 0,});
    setEditingId(null);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-4 lg:h-16">
            <h1 className="text-xl fixed top-3 lg:top-0 lg:relative font-semibold text-gray-900">
              Product Management
            </h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Add/Edit Product Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter product name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate (₹) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className={`flex-1 ${
                  loading
                    ? "bg-blue-300 hover:bg-blue-400 cursor-not-allowed hover:cursor-not-allowed  "
                    : "bg-blue-600 hover:bg-blue-700"
                } cursor-pointer  text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors`}
              >
                {editingId ? (
                  <>
                    {loading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <Edit2 className="w-5 h-5" />
                    )}
                    {loading ? "Updating.." : "Update Product"}
                  </>
                ) : (
                  <>
                    {loading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                    {loading ? "Saving" : "Add product"}
                  </>
                )}
              </button>

              {editingId && (
                <button
                  onClick={handleCancel}
                  className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              All Products ({products.length})
            </h2>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Product Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Rate (₹)
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isProductsLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-400">
                      Loading products...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-400">
                      {searchTerm
                        ? "No products found"
                        : "No products added yet"}
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">
                          {product.name}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        ₹{product.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product, product._id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeletingId(product._id);
                              handleDelete(product._id);
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            {isDeleteLoading && deletingId === product._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {filteredProducts.length === 0 ? (
              <p className="text-center py-8 text-gray-400">
                {searchTerm ? "No products found" : "No products added yet"}
              </p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {product.name}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      Rate:{" "}
                      <span className="font-semibold text-gray-900">
                        ₹{product.price.toFixed(2)}
                      </span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
