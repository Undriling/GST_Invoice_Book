import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import LogoutButton from "../login_signup/logOutBtn";
import { auth, db } from "../../service/firebase";
import { doc, getDoc } from "firebase/firestore";

// Navigation items
const navItems = [
  { icon: "Home", label: "Dashboard", href: "/home" },
  { icon: "FileText", label: "Invoices", href: "/home/viewinvoices" },
  { icon: "Users", label: "Clients", href: "/home/clientsdata" },
  { icon: "Package", label: "Create Invoice", href: "/home/createinvoice" },
  { icon: "CreditCard", label: "Payments", href: "/payments" },
  { icon: "PieChart", label: "Reports", href: "/reports" },
  { icon: "Settings", label: "Settings", href: "/settings" },
  { icon: "LogOut", label: <LogoutButton />, href: "/" },
];

const Sidebaar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  // Check if screen is mobile
  const checkMobile = () => window.innerWidth < 768;
  const [isMobile, setIsMobile] = useState(checkMobile());

  // Update state when window is resized
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("No User Data Found SIDEBAAR");
        }
      }
    };

    fetchUserData();
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  // Close mobile sidebar when clicking outside
  const handleOutsideClick = () => {
    if (isMobile && mobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && !mobileOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-30 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
          aria-label="Open sidebar">
          <Menu size={24} />
        </button>
      )}

      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={handleOutsideClick}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          flex flex-col transition-all duration-300 ease-in-out z-50
          ${
            isMobile
              ? mobileOpen
                ? "left-0"
                : "-left-full"
              : collapsed
              ? "w-20"
              : "w-64"
          }
        `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <div
            className={`flex items-center gap-3 ${
              collapsed && !isMobile ? "justify-center w-full" : ""
            }`}>
            <div className="w-10 h-10 flex-shrink-0 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
              <h2 className="text-3xl">💸</h2>
            </div>
            {(!collapsed || isMobile) && (
              <span className="font-semibold text-lg">Mudra Bill</span>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full dark:hover:bg-gray-800"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {isMobile ? (
              <X size={20} />
            ) : collapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item, index) => {
              // Dynamically import icon
              const IconComponent = React.lazy(() =>
                import("lucide-react").then((module) => ({
                  default: module[item.icon],
                }))
              );

              return (
                <li key={index}>
                  <Link
                    to={item.href}
                    className={`
                      flex items-center rounded-md px-3 py-2 text-gray-700 dark:text-gray-300
                      hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                      ${
                        window.location.pathname === item.href
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : ""
                      }
                      ${collapsed && !isMobile ? "justify-center" : ""}
                    `}>
                    <React.Suspense fallback={<div className="w-5 h-5" />}>
                      <IconComponent size={20} />
                    </React.Suspense>
                    {(!collapsed || isMobile) && (
                      <span className="ml-3">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer - User Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              {/* <span className="text-sm font-medium">US</span> */}
              {userData ? (
                <img
                  src={userData.photoURL}
                  alt="logo"
                  className="border-[1px] border-[#8046FD] bg-gray-300 rounded-full object-cover"
                />
              ) : (
                <img
                  src="/vite.svg"
                  alt="logo"
                  className="border-[1px] border-[#8046FD] bg-gray-300 rounded-full object-cover"
                />
              )}
            </div>
            {(!collapsed || isMobile) && (
              <div className="flex-1">
                {userData ? (
                  <>
                    <p className="text-sm font-medium">
                      {userData?.companyName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {userData?.gstNo}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium">Mudra Bill.Pvt.Ltd</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      AS01ZC2367876V54
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebaar;
