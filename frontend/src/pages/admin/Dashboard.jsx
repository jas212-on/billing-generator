import React, { useEffect, useState } from "react";
import {
  Trash2,
  Package,
  User,
  Plus,
  IndianRupee,
  Loader2,
  Edit2,
} from "lucide-react";
import axiosInstance from "../../lib/axios";
import EmployeeModal from "../../components/EmployeeModal";
import toast from "react-hot-toast";
import LoadingComponent from "../../components/LoadingComponent";

// Dashboard/Analytics Page Component
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("users");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "employee",
    password: "",
  });
  const [usersData, setUsersData] = useState([]);

  const [deletingId, setDeletingId] = useState(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [editing,setEditing] = useState(null)

  const handleDelete = async (id) => {
    try {
      setIsDeleteLoading(true);
      await axiosInstance.delete(`/admin/delete-user/${id}`);
      setUsersData(usersData.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    } finally {
      setIsDeleteLoading(false);
      setDeletingId(null);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/admin/get-users");
        setUsersData(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch users");
      } finally{
        setLoading(false);
      }
    };
    fetchUsers();
  }, [editing]);


  if(loading){
    return(
      <LoadingComponent message="Fetching Users"/>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <EmployeeModal isOpen={isOpen} setIsOpen={setIsOpen} userData={userData} editing={editing} setEditing={setEditing} />
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("users")}
              className={`
                px-6 py-4 text-sm font-medium border-b-2 transition-colors
                ${
                  activeTab === "users"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Employees
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Users Tab Content */}
      {activeTab === "users" && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Employees</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {usersData.length}
                  </h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {usersData.reduce((sum, u) => sum + u.orders, 0)}
                  </h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {usersData.reduce((sum, u) => sum + u.moneySpent, 0)}
                  </h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <IndianRupee className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                All Employees
              </h2>
              <div className="flex  flex-row items-center gap-1 px-2 mb-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Plus className="w-5 h-5" />
                <button onClick={() => setIsOpen(true)} classname="">
                  <span className="cursor-pointer">Add employee</span>
                </button>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Contact
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Orders
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                      Total Billed
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usersData.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                        </div>
                      </td>
                      <td className="text-sm py-4 px-4 text-gray-900">
                        {user.role.toUpperCase()}
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm text-gray-900">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{user.orders}</td>
                      <td className="py-4 px-4 text-right font-semibold text-gray-900">
                        ₹{user.moneySpent.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end gap-2">
                          <button onClick={()=>{
                            setEditing(true)
                            setUserData(user)
                            setIsOpen(true)
                          }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeletingId(user._id);
                              handleDelete(user._id);
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            {isDeleteLoading && deletingId === user._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {usersData.map((user) => (
                <div
                  key={user._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-500">{user.role}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Orders:</span>
                      <span className="font-medium text-gray-900">
                        {user.orders}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Spent:</span>
                      <span className="font-semibold text-gray-900">
                        ₹{user.moneySpent.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
