import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavigationBar from "./components/NavigationBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar (non-scroll) */}
      <NavigationBar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main content */}
      <div className="flex-1 relative">
        {/* Top bar (non-scroll) */}
        <div className="top-2 left-0 lg:left-64 right-0  flex items-center">
          <button className="lg:hidden p-3" onClick={() => setIsOpen(!isOpen)}>
            <Menu size={24} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
