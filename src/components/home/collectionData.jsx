import React from "react";
import useInvoice_Collection from "../../hooks/useInvoice_Collection";

const CollectionData = () => {
  const { invoices, thisMonthTotal, lastMonthTotal } = useInvoice_Collection();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div className="rounded-2xl shadow-lg text-white bg-cyan-500 p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50">
          <h2 className="md:text-3xl text-2xl font-semibold">{thisMonthTotal}</h2>
          <p className="text-lg text-gray-600 font-bold">This Month's Sales</p>
        </div>

        <div
          className="rounded-2xl shadow-lg text-white bg-[#8046FD] p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50">
          <h2 className="md:text-3xl text-2xl font-semibold ">{lastMonthTotal}</h2>
          <p className="text-lg text-gray-700 font-bold">Last Month's Sales</p>
        </div>

        <div className="rounded-2xl shadow-lg text-white bg-gray-500 p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50">
          <h2 className="md:text-3xl text-2xl font-semibold ">{invoices.length}</h2>
          <p className="text-lg text-gray-700 font-bold">Invoices</p>
        </div>
      </div>
    </div>
  );
};

export default CollectionData;
