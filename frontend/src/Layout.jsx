// Layout.jsx
import { Outlet } from "react-router-dom";
import NavigationBar from "./components/navigationBar";

const Layout = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64">
        <NavigationBar />
      </div>

      {/* Scrollable Content */}
      <div className="ml-64 flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

