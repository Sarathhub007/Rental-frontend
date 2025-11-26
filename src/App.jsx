import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/pages/Navbar";

import ProtectedRoute from "./Components/auth/ProtectedRoute";

import Starting from "./Components/pages/Starting";
import Signin from "./Components/auth/Signin";
import Signup from "./Components/auth/Signup";
import About from "./Components/pages/About";
import Home from "./Components/pages/Home";
import Contact from "./Components/pages/Contact";
import Explore from "./Components/pages/Explore";
import PredictRent from "./Components/pages/PredictRent";
import CategorizeIssue from "./Components/pages/CategorizeIssue";
import AddProperty from "./Components/pages/AddProperty";
import PropertiesList from "./Components/pages/PropertiesList";
import PropertyDetails from "./Components/pages/PropertyDetails";
import EditProperty from "./Components/pages/EditProperty";
import Chat from "./Components/pages/Chat.jsx";
import Dashboard from "./Components/pages/dashboard";

// Tenants
import TenantList from "./Components/TenantManagement/TenantList.jsx";
import TenantDetails from "./Components/TenantManagement/TenantDetails.jsx";
import AddTenant from "./Components/TenantManagement/AddTenant.jsx";

// Leases
import LeaseList from "./Components/Leases/LeaseList.jsx";
import LeaseDetails from "./Components/Leases/LeaseDetails.jsx";
import AddLease from "./Components/Leases/AddLease.jsx";

// Maintenance
import MaintenanceList from "./Components/Maintenance/MaintenanceList.jsx";
import MaintenanceDetails from "./Components/Maintenance/MaintenanceDetails.jsx";
import AddMaintenance from "./Components/Maintenance/AddMaintenance.jsx";

import { io } from "socket.io-client";

function AppContainer() {
  const location = useLocation();
  const socket = io("http://localhost:3000");

  // Hide Navbar on auth pages
  const hideNavbar = ["/sign-in", "/sign-up"].includes(location.pathname);

  return (
    <>
     {!hideNavbar && <Navbar socket={socket} />}
      <Routes>
        <Route path="/" element={<Starting />} />

        {/* Public auth routes */}
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />

        {/* Public pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
               <Chat socket={socket} user="Sarath" /> 
            </ProtectedRoute>
          }
        />

        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/explore/:propertyId"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <PropertiesList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/property/add"
          element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/property/:id"
          element={
            <ProtectedRoute>
              <PropertyDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/property/edit/:id"
          element={
            <ProtectedRoute>
              <EditProperty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/predict-rent"
          element={
            <ProtectedRoute>
              <PredictRent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categorize-issue"
          element={
            <ProtectedRoute>
              <CategorizeIssue />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* TENANT MANAGEMENT */}
        <Route
          path="/tenants"
          element={
            <ProtectedRoute>
              <TenantList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tenant/add"
          element={
            <ProtectedRoute>
              <AddTenant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tenant/:id"
          element={
            <ProtectedRoute>
              <TenantDetails />
            </ProtectedRoute>
          }
        />

        {/* LEASE MANAGEMENT */}
        <Route
          path="/leases"
          element={
            <ProtectedRoute>
              <LeaseList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lease/add"
          element={
            <ProtectedRoute>
              <AddLease />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lease/:id"
          element={
            <ProtectedRoute>
              <LeaseDetails />
            </ProtectedRoute>
          }
        />

        {/* MAINTENANCE */}
        <Route
          path="/maintenance"
          element={
            <ProtectedRoute>
              <MaintenanceList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance/add"
          element={
            <ProtectedRoute>
              <AddMaintenance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance/:id"
          element={
            <ProtectedRoute>
              <MaintenanceDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContainer />
    </Router>
  );
}
