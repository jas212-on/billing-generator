import React, { useState, useEffect } from "react";
import { Search, Package, Clock, Filter } from "lucide-react";
import BillDetailsModal from "../../components/BillDetailsModal";
import axiosInstance from "../../lib/axios";

export default function UserDashboardPage() {
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [bills,setBills] = useState([]);

  const [loading,setLoading] = useState(false);

  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredBills = bills.filter((bill) => {
    const matchesSearch =
      bill._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.customerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || bill.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  useEffect(()=>{

    const fetchEmployee = async () => {
      try {
        const response = await axiosInstance.get("/role");
        setEmployeeName(response.data.name);
        setEmployeeId(response.data.userId);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    const fetchBills = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/bills/get-bill/`);
        setBills(response.data);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    };
    fetchBills();
    fetchEmployee();
  },[])

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
          <div className="flex justify-center items-center h-4 lg:h-16">
            <h1 className="text-xl fixed top-3 lg:top-0 lg:relative font-semibold text-gray-900">Dashboard</h1>
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
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 ml-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Billed amount</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {totalAmount.toFixed(2)}
              </h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
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
                  Billed by
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Items
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-400">
                      Loading bills...
                    </td>
                  </tr>
              ):
                filteredBills.length === 0 ? (
                <tr>
                  <td colSpan="6  " className="text-center py-8 text-gray-400">
                    No bills found
                  </td>
                </tr>
              ) : (
                filteredBills.map((bill,idx) => (
                  <tr
                    key={bill._id}
                    className="border-b cursor-pointer border-gray-100 hover:bg-gray-50"
                    onClick={() => handleViewDetails(bill)}
                  >
                    <td className="py-4 px-4">
                      <span className="font-medium text-blue-600">
                        {idx+1}
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
                        {bill.billedBy}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{bill.items}</td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">
                        ₹{bill.amount.toFixed(2)}
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
            filteredBills.map((bill,idx) => (
              <div
                key={bill._id}
                className="border cursor-pointer border-gray-200 rounded-lg p-4"
                onClick={() => handleViewDetails(bill)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-blue-600 mb-1">
                      {idx+1}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(bill.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
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
