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
import ProtectedRoute from "./components/login_signup/protectedRoute.jsx";
import InvoiceDetails from "./components/invoices/invoiceDetails/invoiceDetails.jsx";
import Settings from "./settings/settings.jsx";
import { Toaster } from "react-hot-toast";
import Employee from "./components/employeeData/employee.jsx";
import Reports from "./components/reports/reports.jsx";
import BalancePayment from "./components/payments/balancePayment.jsx";
import About from "./components/custom/about.jsx";
import Profile from "./components/custom/profile.jsx"

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
      { path: "invoice-details", element: <InvoiceDetails /> },
      { path: "settings", element: <Settings /> },
      { path: "employees-data", element: <Employee /> },
      { path: "sales-reports", element: <Reports /> },
      { path: "payments", element: <BalancePayment /> },
      { 
        path: "about-mudra-bill", 
        children: [
          { 
            index: true,
            element: <About />
          },
          { 
            path: "profile", 
            element: <Profile />
          }
        ]
      },
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-center"/>
    <RouterProvider router={router} />
  </StrictMode>
);
