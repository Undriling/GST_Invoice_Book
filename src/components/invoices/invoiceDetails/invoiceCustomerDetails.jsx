import React from "react";
import { useLocation } from "react-router";

const InvoiceCustomerDetails = () => {
  const location = useLocation();
  const invoiceData = location.state?.invoice;

  return (
    <div className="mt-4 text-gray-700">
      <h2 className="font-extrabold text-lg">To,</h2>
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
        <p>
          <strong>Memo No:</strong> {invoiceData?.customerDetails?.memoNo}
        </p>
      )}
    </div>
  );
};

export default InvoiceCustomerDetails;
