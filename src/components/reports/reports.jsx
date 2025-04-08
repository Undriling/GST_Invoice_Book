import React from "react";
import ChartData from "./chartData";
import useUserData from "../../hooks/useUserData";
import useInvoice_Collection from "../../hooks/useInvoice_Collection";
import useDailySales from "../../hooks/useDailySales";

const Reports = () => {
  const { userData } = useUserData();
  const { total, thisMonthTotal, monthCashTotal, monthUpiTotal } =
    useInvoice_Collection();
  const { todayCashTotal, todayUpiTotal } = useDailySales();

  return (
    <>
      <div className="flex justify-center items-center">
        <img
          src="/src/assets/logo2.jpeg"
          alt="Mudra Logo"
          className="w-30 h-30"
        />
        <h2 className="text-3xl text-gray-600 -ml-4">
          {userData?.companyName
            ? userData?.companyName + " Sales Reports"
            : "Sales Report By Mudra"}
        </h2>
      </div>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <div
            className="rounded-2xl shadow-lg text-white bg-pink-600 p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50">
            <h2 className="text-3xl font-semibold">{todayCashTotal}</h2>
            <p className="text-lg text-yellow-100">Today's Sales by Cash</p>
          </div>

          <div
            className="rounded-2xl shadow-lg text-white bg-[#8046FD] p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50">
            <h2 className="text-3xl font-semibold">{todayUpiTotal}</h2>
            <p className="text-lg text-yellow-100">
              Today's Sales by UPI/Cheque
            </p>
          </div>

          <div
            className="rounded-2xl shadow-lg text-white bg-cyan-500 p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50">
            <h2 className="text-3xl font-semibold">{thisMonthTotal}</h2>
            <p className="text-lg text-yellow-100">This Month's Sales</p>
          </div>

          <div
            className="rounded-2xl shadow-lg text-white bg-[#467dfd] p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50">
            <h2 className="text-3xl font-semibold">{monthCashTotal}</h2>
            <p className="text-lg text-yellow-100">
              This Month's Sales by Cash
            </p>
          </div>

          <div
            className="rounded-2xl shadow-lg text-white bg-gray-500 p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50">
            <h2 className="text-3xl font-semibold">{monthUpiTotal}</h2>
            <p className="text-lg text-yellow-100">
              This Month's Sales by UPI/Cheque
            </p>
          </div>

          <div className="rounded-2xl shadow-lg text-white bg-green-400 p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50">
            <h2 className="text-2xl font-semibold">{total}</h2>
            <p className="text-lg text-gray-700 font-bold">Overall Sales</p>
          </div>
        </div>

        {/* Chart */}
        <div className="gap-4 p-4">
          <ChartData />
        </div>
      </div>
    </>
  );
};

export default Reports;
