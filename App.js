import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SalePersonDashBoard from "./pages/SalePersonDashBoard";
import StoreManagerDashBoard from "./pages/StoreMAnagerDashBoard";
import AreaManagerDashBoard from "./pages/AreaManagerDashBoard";
import SalesPersonCampaignDetails from "./pages/SalesPersonCampaignDetails";
import StoreManagerPersonDetails from "./pages/StoreManagerPersonDetails";
import OrderDetails from "./pages/OrderDetails";
import AreaManagerStoreOverview from "./pages/AreaManagerStoreOverview";
import AreaManagerStorePersonDetails from "./pages/AreaManagerStorePersonDetails";
import { useEffect, useState, useContext } from "react";
import { checkToken } from "./api/auth";
import UserContext from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import "./i18n";

function App() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const tokenData = checkToken();
    if (tokenData) {
      setUser({
        isAuthenticated: true,
        role: tokenData.role, // Set the role from the token
      });
    }
  }, [setUser]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* SalesPerson Routes */}
      <Route
        path="/salesdashboard"
        element={
          <ProtectedRoute allowedRoles={["salesPerson"]}>
            <SalePersonDashBoard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salespersonCampainDetails"
        element={
          <ProtectedRoute allowedRoles={["salesPerson"]}>
            <SalesPersonCampaignDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orderdetails"
        element={
          <ProtectedRoute allowedRoles={["salesPerson", "storeManager", "areaManager"]}>
            <OrderDetails />
          </ProtectedRoute>
        }
      />

      {/* StoreManager Routes */}
      <Route
        path="/storedashboard"
        element={
          <ProtectedRoute allowedRoles={["storeManager"]}>
            <StoreManagerDashBoard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/storeManagerPersonDetails"
        element={
          <ProtectedRoute allowedRoles={["storeManager"]}>
            <StoreManagerPersonDetails />
          </ProtectedRoute>
        }
      />

      {/* AreaManager Routes */}
      <Route
        path="/areadashboard"
        element={
          <ProtectedRoute allowedRoles={["areaManager"]}>
            <AreaManagerDashBoard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/areaManagerStoreOverview"
        element={
          <ProtectedRoute allowedRoles={["areaManager"]}>
            <AreaManagerStoreOverview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/areaManagerStorePersonDetails"
        element={
          <ProtectedRoute allowedRoles={["areaManager"]}>
            <AreaManagerStorePersonDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
