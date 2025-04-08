import React from "react";

const InvoiceHeader = ({ invoiceData, userData }) => {
  console.log("User Data details", userData);
  console.log("Invoice Data", invoiceData);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center gap-4">
          <img
            src={userData ? userData.photoURL : "../../src/assets/logo.jpeg"}
            alt="User"
            className="md:w-25 w-18 h-18 md:h-25 rounded-full border"
          />
          <div className="companyData">
            <h2 className="md:text-2xl text-sm font-bold">{userData?.companyName}</h2>
            <h3 className="md:text-[16px] text-[12px]">{userData?.gstNo}</h3>
            <p className="md:text-[15px] text-[12px]">
              {userData?.otherTaxRegistrationNo
                ? userData?.otherTaxRegistrationNo
                : ""}
            </p>
            <p className="md:text-[15px] text-[12px]">{userData?.email}</p>
            <p className="md:text-[15px] text-[12px]">{userData?.phoneNumber}</p>
          </div>
        </div>
        <div className="text-center invoiceId">
          <p className="font-bold text-gray-700 text-sm md:text-2xl">INVOICE</p>
          <h4 className="md:text-[15px] text-[12px] text-gray-600">
            Invoice Id: {invoiceData?.id?.slice(0, 6)?.toUpperCase()}
          </h4>
          <h4 className="md:text-[15px] text-[12px] text-gray-600">
            Date:{" "}
            {invoiceData?.date
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
