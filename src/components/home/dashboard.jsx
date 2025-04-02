import React from "react";
import { Outlet } from "react-router";
// import AppSidebar from "../custom/sidebar";
import Sidebaar from "../custom/Sidebaar";


const Dashboard = () => {
  return (
    <div>
      <div className="flex w-screen">
        
        <Sidebaar/>

        <div className="flex-col w-screen bg-[#eee] h-screen text-black p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
