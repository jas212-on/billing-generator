import React, { useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";

export default function BillingHome() {
  const [products, setProducts] = useState([]);
  const [labourCharges, setLabourCharges] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    price: null,
    quantity: null,
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [addedProducts, setAddedProducts] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [currentLabour, setCurrentLabour] = useState({
    name: "",
    cost: null,
  });
  const [paymentMode, setPaymentMode] = useState();

  const addProduct = () => {
    if (
      currentProduct.name &&
      currentProduct.rate > 0 &&
      currentProduct.quantity > 0
    ) {
      setAddedProducts([
        ...addedProducts,
        { ...currentProduct, id: Date.now() },
      ]);
      setCurrentProduct({ name: "", quantity: 1, rate: 0 });
    }
  };

  const addLabour = () => {
    if (currentLabour.name && currentLabour.cost > 0) {
      setLabourCharges([
        ...labourCharges,
        { ...currentLabour, id: Date.now() },
      ]);
      setCurrentLabour({ name: "", cost: 0 });
    }
  };

  const removeProduct = (id) => {
    setAddedProducts(addedProducts.filter((p) => p.id !== id));
  };

  const removeLabour = (id) => {
    setLabourCharges(labourCharges.filter((l) => l.id !== id));
  };

  const calculateTotal = () => {
    const productTotal = addedProducts.reduce(
      (sum, p) => sum + p.quantity * p.rate,
      0
    );
    const labourTotal = labourCharges.reduce(
      (sum, l) => sum + parseFloat(l.cost),
      0
    );
    return productTotal + labourTotal;
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setCurrentProduct({
      ...currentProduct,
      name: value,
      price: 0,
      quantity: 1,
    });

    if (value.trim() === "") {
      setFilteredProducts([]);
      setShowDropdown(false);
      return;
    }

    const matches = products.filter((p) =>
      p.name.toLowerCase().startsWith(value.toLowerCase())
    );

    setFilteredProducts(matches);
    setShowDropdown(true);
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}

      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Billing Home
            </h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Add Products and Labour */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Products Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Add Products
              </h2>

              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>

                  <input
                    type="text"
                    value={currentProduct.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  {showDropdown && filteredProducts.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                      {filteredProducts.map((product, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setCurrentProduct({
                              ...currentProduct,
                              name: product.name,
                              rate: product.price,
                            });
                            setShowDropdown(false);
                          }}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                        >
                          <div className="flex flex-row justify-between">
                            <span>{product.name}</span>
                            <span>₹{product.price}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      defaultValue={1}
                      value={currentProduct.quantity}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          quantity: parseInt(e.target.value) || null,
                        })
                      }
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rate (₹)
                    </label>
                    <input
                      type="number"
                      defaultValue={0}
                      value={currentProduct.rate}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          rate: parseFloat(e.target.value) || null,
                        })
                      }
                      placeholder="100"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={addProduct}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Item
                </button>
              </div>
            </div>

            {/* Labour Charges Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Labour Charges
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Labour/Service Name
                    </label>
                    <input
                      type="text"
                      value={currentLabour.name}
                      onChange={(e) =>
                        setCurrentLabour({
                          ...currentLabour,
                          name: e.target.value,
                        })
                      }
                      placeholder="e.g. Oil Change"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cost (₹)
                    </label>
                    <input
                      type="number"
                      defaultValue={0}
                      value={currentLabour.cost}
                      onChange={(e) =>
                        setCurrentLabour({
                          ...currentLabour,
                          cost: parseFloat(e.target.value) || null,
                        })
                      }
                      placeholder="0.00"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={addLabour}
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Labour
                </button>
              </div>
            </div>

            {/* Customer Info Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Customer Information
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer name
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          email: e.target.value,
                        })
                      }
                      placeholder="Enter email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Enter Phone no"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Check className="w-5 h-5" />
                  Add Customer Info
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Bill Items */}
          <div className="space-y-6">
            {/* Bill Items Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Bill Items ({addedProducts.length + labourCharges.length})
                </h2>
                <span className="text-lg font-semibold text-blue-600">
                  Total: ₹{calculateTotal().toFixed(2)}
                </span>
              </div>

              {/* Customer Info */}
              <div className="flex flex-col">
                {customerInfo.name && (
                  <span>Customer Name: {customerInfo.name}</span>
                )}
                {customerInfo.email && (
                  <span>Customer Email: {customerInfo.email}</span>
                )}
                {customerInfo.phone && (
                  <span>Customer Phone: {customerInfo.phone}</span>
                )}
              </div>

              <div className="space-y-2">
                <hr className="border-t-2 border-dashed border-gray-300 my-4" />
              </div>

              <div className="space-y-3">
                {addedProducts.length === 0 && labourCharges.length === 0 ? (
                  <p className="text-center text-gray-400 py-8">
                    No items added yet
                  </p>
                ) : (
                  <>
                    {addedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {product.quantity} × ₹{product.rate} = ₹
                            {(product.quantity * product.rate).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {labourCharges.map((labour) => (
                      <div
                        key={labour.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {labour.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            ₹{parseFloat(labour.cost).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeLabour(labour.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/*** Right Column - Pay now buttons */}
            {(addedProducts.length > 0 || labourCharges.length > 0) && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Mode of Payment
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        id="cash"
                        value="cash"
                        className="w-4 h-4"
                        onChange={(e)=>setPaymentMode(e.target.value)}
                      />
                      <span className="ml-3 text-gray-700">Cash</span>
                    </label>

                    <label className="flex items-center p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        id="card"
                        value="card"
                        className="w-4 h-4"
                        onChange={(e)=>setPaymentMode(e.target.value)}
                      />
                      <span className="ml-3 text-gray-700">Card</span>
                    </label>

                    <label className="flex items-center p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        id="upi"
                        value="upi"
                        className="w-4 h-4"
                        onChange={(e)=>setPaymentMode(e.target.value)}
                      />
                      <span className="ml-3 text-gray-700">UPI</span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center gap-4 w-full">
                  <button className="px-6 py-2 w-full bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                    Pay now
                  </button>
                  <button className="px-6 py-2 w-full bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                    Pay later
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
