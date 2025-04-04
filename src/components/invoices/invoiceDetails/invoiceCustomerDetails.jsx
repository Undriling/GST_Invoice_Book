import React from "react";


const InvoiceCustomerDetails = ({invoiceData}) => {


  return (
    <div className="mt-4 text-gray-700 customerDetails">
      <h2 className="font-extrabold text-[17px]">To,</h2>
      <p>
        <strong>Name:</strong> {invoiceData?.customerDetails?.to}
      </p>
      <p>
        <strong>Address:</strong> {invoiceData?.customerDetails?.address}
      </p>
      <p>
        <strong>Phone No:</strong> {invoiceData?.customerDetails?.phone}
      </p>

      {invoiceData?.customerDetails?.gstNo && (
        <p>
          <strong>GST No:</strong> {invoiceData?.customerDetails?.gstNo}
        </p>
      )}

      {invoiceData?.customerDetails?.paidBy && (
        <p>
          <strong>Payment Method:</strong>{" "}
          {invoiceData?.customerDetails?.paidBy?.toUpperCase()}
        </p>
      )}

      {invoiceData?.customerDetails?.memoNo && (
        <p className="memoNo">
          <strong>Memo No:</strong> {invoiceData?.customerDetails?.memoNo}
        </p>
      )}
    </div>
  );
};

export default InvoiceCustomerDetails;
