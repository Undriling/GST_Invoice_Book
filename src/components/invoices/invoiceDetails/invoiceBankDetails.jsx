import React from "react";

const InvoiceBankDetails = ({ userData }) => {
  return (
    <div className="flex justify-between rounded-lg mt-4 border bg-gray-50 bank&TC">
      <div className="p-4 bankDetails">
        <h3 className="font-bold text-gray-700">Bank Details :-</h3>
        <p>
          Bank Name:{" "}
          <span className="font-medium">{userData?.bankDetails?.bankName}</span>
        </p>
        <p>
          A/C No:{" "} 
          <span className="font-medium">{userData?.bankDetails?.bankACNo}</span>
        </p>
        <p>
          IFSC Code:{" "}
          <span className="font-medium">{userData?.bankDetails?.bankIfsc}</span>
        </p>
        <p>
          UPI ID:{" "}
          <span className="font-medium">{userData?.bankDetails?.upiId}</span>
        </p>
      </div>

      <div className="p-4 italic termsCon">
        <h3 className="font-bold text-gray-600">Terms & Condition :-</h3>
        <p>* All disputes subject to Seller's official Jurisdiction only.</p>
        <p>* Goods dispatched on customer's risk.</p>
        <p>* Interest will be charged 24% i.e. payment not made by due date.</p>
        <p>* Goods once sold will not be taken back.</p>
      </div>
    </div>
  );
};

export default InvoiceBankDetails;
