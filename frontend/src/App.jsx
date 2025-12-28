import { Routes, Route } from "react-router";
import ProductManagement from "./pages/admin/AddProduct";
import BillingHome from "./pages/HomePage";
import Layout from "./Layout";
import HistoryPage from "./pages/admin/HistoryPage";
import InsightsPage from "./pages/admin/InsightsPage";
import DashboardPage from "./pages/admin/Dashboard";
import UserDashboardPage from "./pages/user/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import axiosInstance from "./lib/axios";
import { useEffect, useState } from "react";
import InvoiceLanding from "./pages/LandingPage";
import { Toaster } from "react-hot-toast";
import LoadingComponent from "./components/LoadingComponent";

function App() {
  const [role, setRole] = useState(null);
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axiosInstance.get("/role");
        console.log(response.data.role);
        setRole(response.data.role);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRole();
  }, []);

  if (role === null) {
    return <LoadingComponent message="Getting things ready for you..." />; // or spinner
  }

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<InvoiceLanding />} />

        <Route element={<Layout />}>
          <Route path="/add-product" element={<ProductManagement />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/billing" element={<BillingHome />} />
          <Route path="/user/dashboard" element={<UserDashboardPage />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
