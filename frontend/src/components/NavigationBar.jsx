import { useEffect, useState } from 'react';
import { Home, Package, Clock, X, BarChart, LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { axiosInstance } from '../lib/axios';

// Navigation Bar Component
export const NavigationBar = ({isOpen, setIsOpen}) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, navigate:"/user/dashboard",roles: ["user"] },
    { id: 'dashboard', label: 'Dashboard', icon: Home, navigate:"/admin/dashboard",roles: ["admin"] },
    { id: 'billing', label: 'Billing', icon: Home, navigate:"/billing",roles: ["user"] },
    { id: 'products', label: 'Add Product', icon: Package, navigate:"/add-product", roles: ["admin"] },
    { id: 'history', label: 'History', icon: Clock, navigate:"/history", roles: ["admin"] },
    { id: 'insights', label: 'Insights', icon: BarChart, navigate:"/insights",roles: ["admin"] },
  ];
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("dashboard");

  const [role,setRole] = useState("");

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axiosInstance.get("/role");
        console.log(response.data.role)
        setRole(response.data.role);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRole();

    const path=location.pathname;
    if(path.includes("add-product")){
      setSelectedItem("products");
    }else if(path.includes("history")){
      setSelectedItem("history");
    }else if(path.includes("insights")){
      setSelectedItem("insights");
    }else if(path.includes("dashboard")){
      setSelectedItem("dashboard");
    }else if(path.includes("billing")){
      setSelectedItem("billing");
    }
  })

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out top-0 h-screen 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}>
        <div className="flex flex-col h-screen">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Invoice hub</h2>
            {/* <button 
              className=" p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button> */}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map(item => {
              if(item.roles.includes(role)===false) return null;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={()=>{
                    setSelectedItem(item.id);
                    setIsOpen(false);
                    navigate(item.navigate)}
                  }
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-colors text-left cursor-pointer
                    ${selectedItem === item.id ? 'bg-blue-700 text-white hover:bg-blue-800' : 'hover:bg-gray-100'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left cursor-pointer bg-red-100">
                <LogOutIcon className="w-5 h-5" />
                <span className="font-medium">Logout</span>
            </button>
          </nav>

          {/* Sidebar Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">Version 1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default NavigationBar;