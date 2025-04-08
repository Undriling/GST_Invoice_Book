import React from "react";
import useDailySales from "../../hooks/useDailySales";

const DailySales = () => {
  const { todaySales, yesterdaySales } = useDailySales();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
      <div
        className="rounded-2xl shadow-lg text-white bg-pink-600 p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50">
        <h2 className="md:text-3xl text-2xl font-semibold">{todaySales}</h2>
        <p className="text-lg text-yellow-100 font-bold">Today's Sales</p>
      </div>

      <div
        className="rounded-2xl shadow-lg text-white bg-[#467dfd] p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50">
        <h2 className="md:text-3xl text-2xl font-semibold">{yesterdaySales}</h2>
        <p className="text-lg text-yellow-100 font-bold">Yesterday's Sales</p>
      </div>
    </div>
  );
};

export default DailySales;
