import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./components/login_signup/login.jsx";
import SignUp from "./components/login_signup/signUp.jsx";
import ViewInvoices from "./components/invoices/viewInvoices.jsx";
import CreateInvoices from "./components/invoices/createInvoice/createInvoices.jsx";
import Home from "./components/home/home.jsx";
import ClientsData from "./components/Clients/clientsData.jsx";
import ProtectedRoute from "./components/login_signup/protectedRoute.jsx";
import InvoiceDetails from "./components/invoices/invoiceDetails/invoiceDetails.jsx";
import Settings from "./settings/settings.jsx";
// import { Settings } from "lucide-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element:<ProtectedRoute><App /></ProtectedRoute>,
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "viewinvoices", element: <ViewInvoices /> },
      { path: "createinvoice", element: <CreateInvoices /> },
      { path: "clientsdata", element: <ClientsData /> },
      { path: "invoice-details", element: <InvoiceDetails /> },
      { path: "settings", element: <Settings /> },
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
