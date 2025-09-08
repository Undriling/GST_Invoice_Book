import React from "react";

const InvoiceItemTable = ({ invoiceData }) => {
  return (
    <>
      <table className="md:w-full w-screen text-[10px] md:text-[16px] border-collapse border border-black mt-4">
        <thead>
          <tr className="bg-[#f0f0f0] text-grey-700">
            <th className="border p-2">S.No</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">GST %</th>
            <th className="border p-2">GST Amt.</th>
            <th className="border p-2">
              Total (Incl.
              <br />
              Taxes)
            </th>
          </tr>
        </thead>
        <tbody>
          {invoiceData?.productDetails.map(
            (product, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  {product?.productName?.toUpperCase()}
                </td>
                <td className="border p-2">
                  {(product?.price * 1).toFixed(2)}
                </td>
                <td className="border p-2">
                  {product?.quantity}
                </td>
                <td className="border p-2">
                  {(
                    product.price * product.quantity
                  ).toFixed(2)}
                </td>
                <td className="border p-2">
                  {product?.gstPercentage} %
                </td>
                <td className="border p-2">
                  {(
                    product.price *
                    product.quantity *
                    (product.gstPercentage / 100)
                  ).toFixed(2)}
                </td>
                <td className="border p-2">
                  {/* ₹{" "} */}
                  {(
                    product.price * product.quantity +
                    product.price *
                      product.quantity *
                      (product.gstPercentage / 100)
                  ).toFixed(2)}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>


      <div className="flex justify-between text-[12px] md:text-lg mt-4 text-lg font-bold">
        <p>Grand Total :-</p>
        <p className="text-gray-700">
          ₹ {invoiceData?.productsTotal.toFixed(2)}
        </p>
      </div>


      {/* GST Summary */}
      {/* <table className="w-1/2 border-collapse border border-black mt-4 text-center text-[10px] md:text-[16px]">
        <thead>
          <tr>
            <th className="border p-2" colSpan={3}>
              GST Summary
            </th>
          </tr>
          <tr>
            <th className="border p-2">Tax Type</th>
            <th className="border p-2">Tax %</th>
            <th className="border p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData?.productDetails.map(
            (product, index) => {
              const amount =
                product.price * product.quantity;
              const gstAmount =
                amount * (product.gstPercentage / 100);
              const halfPercent = product.gstPercentage / 2;
              const halfAmount = gstAmount / 2;

              return (
                <React.Fragment key={index}>
                  <tr>
                    <td className="border p-2">CGST</td>
                    <td className="border p-2">
                      {halfPercent} %
                    </td>
                    <td className="border p-2">
                      {halfAmount.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">SGST</td>
                    <td className="border p-2">
                      {halfPercent} %
                    </td>
                    <td className="border p-2">
                      {halfAmount.toFixed(2)}
                    </td>
                  </tr>
                </React.Fragment>
              );
            }
          )}
        </tbody>
      </table> */}
    </>
  );
};

export default InvoiceItemTable;
