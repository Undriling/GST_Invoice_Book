import React from "react";

const InvoiceHeader = ({invoiceData, userData}) => {
    

  console.log("User Data details", userData);
  console.log("Invoice Data", invoiceData)

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center gap-4">
          <img
            src={userData ? userData.photoURL : "../../src/assets/logo.jpeg"}
            alt="User"
            className="w-25 h-25 rounded-full"
          />
          <div className="companyData">
            <h2 className="text-2xl font-bold">{userData?.companyName}</h2>
            <h3 className="text-[16px]">{userData?.gstNo}</h3>
            <p className="text-[15px]">
              {userData?.otherTaxRegistrationNo
                ? userData?.otherTaxRegistrationNo
                : ""}
            </p>
            <p className="text-[15px]">{userData?.email}</p>
            <p className="text-[15px]">{userData?.phoneNumber}</p>
          </div>
        </div>
        <div className="text-center invoiceId">
          <p className="font-bold text-gray-700 text-2xl">INVOICE</p>
          <h4 className="text-[15px] text-gray-600">
            Invoice Id: {invoiceData?.id?.slice(0, 6)?.toUpperCase()}
          </h4>
          <h4 className="text-[15px] text-gray-600">
            Date: {invoiceData?.date
              ? new Date(invoiceData?.date?.seconds * 1000).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )
              : ""}
          </h4>
        </div>
      </div>
    </>
  );
};

export default InvoiceHeader;
