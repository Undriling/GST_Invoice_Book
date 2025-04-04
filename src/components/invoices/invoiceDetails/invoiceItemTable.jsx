import React from "react";


const InvoiceItemTable = ({invoiceData}) => {

  return (
    <>
      <table className="w-full border-collapse border border-black mt-4">
        <thead>
          <tr className="bg-[#f0f0f0] text-grey-700">
            <th className="border p-2">S.No</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">GST %</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData?.productDetails.map((product, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                {product?.productName?.toUpperCase()}
              </td>
              <td className="border p-2">₹ {product?.price}</td>
              <td className="border p-2">{product?.quantity}</td>
              <td className="border p-2">{product?.gstPercentage}</td>
              <td className="border p-2">
                ₹{" "}
                {(
                  product.price * product.quantity +
                  product.price *
                    product.quantity *
                    (product.gstPercentage / 100)
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4 text-lg font-bold">
        <p>Total:</p>
        <p className="text-gray-700">
          ₹ {invoiceData?.productsTotal.toFixed(2)}
        </p>
      </div>
    </>
  );
};

export default InvoiceItemTable;
