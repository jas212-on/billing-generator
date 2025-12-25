import { useEffect, useState } from 'react';
import { Home, Package, Clock, X, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router';

// Navigation Bar Component
export const NavigationBar = ({isOpen, setIsOpen}) => {
  const navigationItems = [
    { id: 'billing', label: 'Billing Home', icon: Home, navigate:"/" },
    { id: 'products', label: 'Add Product', icon: Package, navigate:"/add-product" },
    { id: 'history', label: 'History', icon: Clock, navigate:"/history" },
    { id: 'insights', label: 'Insights', icon: BarChart, navigate:"/insights" },
  ];
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("billing");

  useEffect(() => {
    const path=location.pathname;
    if(path.includes("add-product")){
      setSelectedItem("products");
    }else if(path.includes("history")){
      setSelectedItem("history");
    }else if(path.includes("insights")){
      setSelectedItem("insights");
    }else{
      setSelectedItem("billing");
    }
  })

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
            <h2 className="text-xl font-bold text-gray-900">Billing App</h2>
            {/* <button 
              className=" p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button> */}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map(item => {
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