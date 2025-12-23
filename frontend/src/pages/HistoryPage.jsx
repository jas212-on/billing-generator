import React, { useState } from "react";
import { Search, Package, Clock, Filter } from "lucide-react";
import BillDetailsModal from "../components/BillDetailsModal";

export default function HistoryPage() {
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [bills] = useState([
    {
      id: 'BL-001',
      date: '2024-12-20',
      customerName: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      phone: '+91 98765 43210',
      items: 5,
      amount: 1250.00,
      status: 'paid',
      items_detail: [
        { name: 'Prince Biscuit', quantity: 10, price: 10 },
        { name: 'Parle-G', quantity: 20, price: 5 },
        { name: 'Britannia Marie', quantity: 5, price: 25 },
        { name: 'Good Day', quantity: 8, price: 15 },
        { name: 'Hide & Seek', quantity: 6, price: 20 }
      ],
      labourCharges: [
        { name: 'Packaging', cost: 50 },
        { name: 'Delivery', cost: 100 }
      ],
      subtotal: 1100
    },
    {
      id: 'BL-002',
      date: '2024-12-19',
      customerName: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43211',
      items: 3,
      amount: 850.50,
      status: 'unpaid',
      items_detail: [
        { name: 'Maggi', quantity: 20, price: 12 },
        { name: 'Bru Coffee', quantity: 5, price: 85 },
        { name: 'Dairy Milk', quantity: 10, price: 35 }
      ],
      labourCharges: [
        { name: 'Handling', cost: 25.50 }
      ],
      subtotal: 825
    },
    {
      id: 'BL-003',
      date: '2024-12-19',
      customerName: 'Amit Patel',
      email: 'amit.patel@example.com',
      phone: '+91 98765 43212',
      items: 8,
      amount: 2100.00,
      status: 'paid',
      items_detail: [
        { name: 'Amul Butter', quantity: 10, price: 50 },
        { name: 'Bread', quantity: 15, price: 40 },
        { name: 'Milk', quantity: 20, price: 25 },
        { name: 'Eggs', quantity: 30, price: 6 },
        { name: 'Cheese', quantity: 5, price: 80 },
        { name: 'Yogurt', quantity: 10, price: 15 },
        { name: 'Jam', quantity: 8, price: 60 },
        { name: 'Honey', quantity: 4, price: 120 }
      ],
      labourCharges: [
        { name: 'Cold Storage', cost: 150 }
      ],
      subtotal: 1950
    },
    {
      id: 'BL-004',
      date: '2024-12-18',
      customerName: 'Sneha Reddy',
      email: 'sneha.reddy@example.com',
      phone: '+91 98765 43213',
      items: 2,
      amount: 450.00,
      status: 'unpaid',
      items_detail: [
        { name: 'Coca Cola', quantity: 12, price: 20 },
        { name: 'Lays Chips', quantity: 15, price: 10 }
      ],
      labourCharges: [],
      subtotal: 450
    },
    {
      id: 'BL-005',
      date: '2024-12-18',
      customerName: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      phone: '+91 98765 43214',
      items: 6,
      amount: 1680.75,
      status: 'paid',
      items_detail: [
        { name: 'Basmati Rice', quantity: 10, price: 80 },
        { name: 'Pulses', quantity: 5, price: 120 },
        { name: 'Oil', quantity: 8, price: 150 },
        { name: 'Sugar', quantity: 10, price: 40 },
        { name: 'Salt', quantity: 5, price: 20 },
        { name: 'Spices Mix', quantity: 3, price: 95 }
      ],
      labourCharges: [
        { name: 'Heavy Item Handling', cost: 75.75 }
      ],
      subtotal: 1605
    },
    {
      id: 'BL-006',
      date: '2024-12-17',
      customerName: 'Anita Desai',
      email: 'anita.desai@example.com',
      phone: '+91 98765 43215',
      items: 4,
      amount: 920.00,
      status: 'unpaid',
      items_detail: [
        { name: 'Cookies', quantity: 12, price: 30 },
        { name: 'Cake', quantity: 2, price: 250 },
        { name: 'Pastries', quantity: 8, price: 35 },
        { name: 'Brownies', quantity: 6, price: 25 }
      ],
      labourCharges: [
        { name: 'Fragile Packaging', cost: 70 }
      ],
      subtotal: 850
    },
    {
      id: 'BL-007',
      date: '2024-12-17',
      customerName: 'Rahul Mehta',
      email: 'rahul.mehta@example.com',
      phone: '+91 98765 43216',
      items: 10,
      amount: 3200.00,
      status: 'paid',
      items_detail: [
        { name: 'Washing Powder', quantity: 5, price: 250 },
        { name: 'Soap', quantity: 20, price: 30 },
        { name: 'Shampoo', quantity: 8, price: 150 },
        { name: 'Toothpaste', quantity: 10, price: 50 },
        { name: 'Detergent', quantity: 6, price: 200 },
        { name: 'Floor Cleaner', quantity: 4, price: 120 },
        { name: 'Dish Wash', quantity: 8, price: 80 },
        { name: 'Toilet Cleaner', quantity: 5, price: 90 },
        { name: 'Air Freshener', quantity: 6, price: 75 },
        { name: 'Napkins', quantity: 10, price: 45 }
      ],
      labourCharges: [
        { name: 'Bulk Order Discount', cost: -100 },
        { name: 'Express Delivery', cost: 200 }
      ],
      subtotal: 3100
    },
    {
      id: 'BL-008',
      date: '2024-12-16',
      customerName: 'Kavita Nair',
      email: 'kavita.nair@example.com',
      phone: '+91 98765 43217',
      items: 3,
      amount: 675.50,
      status: 'unpaid',
      items_detail: [
        { name: 'Green Tea', quantity: 10, price: 45 },
        { name: 'Honey', quantity: 3, price: 120 },
        { name: 'Oats', quantity: 5, price: 55 }
      ],
      labourCharges: [
        { name: 'Gift Wrapping', cost: 50.50 }
      ],
      subtotal: 625
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredBills = bills.filter((bill) => {
    const matchesSearch =
      bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.customerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || bill.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

   const handleViewDetails = (bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const totalAmount = filteredBills.reduce((sum, bill) => sum + bill.amount, 0);
  const paidAmount = filteredBills
    .filter((bill) => bill.status === "paid")
    .reduce((sum, bill) => sum + bill.amount, 0);
  const unpaidAmount = filteredBills
    .filter((bill) => bill.status === "unpaid")
    .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">History</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>
      {/* Bill Details Modal */}
      <BillDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bill={selectedBill}
      />
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
        <div className="bg-white rounded-lg shadow-sm p-6 ml-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Bills</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {filteredBills.length}
              </h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            ₹{totalAmount.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Paid</p>
              <h3 className="text-2xl font-bold text-green-600">
                {filteredBills.filter((b) => b.status === "paid").length}
              </h3>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">₹{paidAmount.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mr-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Unpaid</p>
              <h3 className="text-2xl font-bold text-red-600">
                {filteredBills.filter((b) => b.status === "unpaid").length}
              </h3>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            ₹{unpaidAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Bills Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Billing History
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search bills..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Bill ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Items
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.length === 0 ? (
                <tr>
                  <td colSpan="6  " className="text-center py-8 text-gray-400">
                    No bills found
                  </td>
                </tr>
              ) : (
                filteredBills.map((bill) => (
                  <tr
                    key={bill.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                    onClick={() => handleViewDetails(bill)}
                  >
                    <td className="py-4 px-4">
                      <span className="font-medium text-blue-600">
                        {bill.id}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {new Date(bill.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">
                        {bill.customerName}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{bill.items}</td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">
                        ₹{bill.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`
                        inline-block px-3 py-1 text-xs font-medium rounded-full
                        ${
                          bill.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                      >
                        {bill.status.charAt(0).toUpperCase() +
                          bill.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {filteredBills.length === 0 ? (
            <p className="text-center py-8 text-gray-400">No bills found</p>
          ) : (
            filteredBills.map((bill) => (
              <div
                key={bill.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-blue-600 mb-1">
                      {bill.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(bill.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`
                    inline-block px-3 py-1 text-xs font-medium rounded-full
                    ${
                      bill.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                  >
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-2 mb-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Customer:</span>{" "}
                    {bill.customerName}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Items:</span> {bill.items}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Amount:</span>{" "}
                    <span className="font-bold text-gray-900">
                      ₹{bill.amount.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
