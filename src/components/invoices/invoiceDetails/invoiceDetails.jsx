import { useLocation } from "react-router";
import InvoiceHeader from "./invoiceHeader";
import InvoiceBankDetails from "./invoiceBankDetails";
import InvoiceCustomerDetails from "./invoiceCustomerDetails";
import InvoiceItemTable from "./invoiceItemTable";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../service/firebase";
import usePrintInvoice from "../../../hooks/usePrintInvoice";

const InvoiceDetails = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const invoiceData = location.state?.invoice;
  const handlePrint = usePrintInvoice();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("No User Data Found SIDEBAAR");
        }
      }
    };

    fetchUserData();
  }, []);

  if (!invoiceData) {
    return <p className="text-center text-lg">No invoice data found.</p>;
  }

  //   console.log("Invoice details", invoiceData);

  console.log(handlePrint, "Clicked to Print");

  return (
    <>
      {/* Print Button */}
      <div className="mt-4 text-right flex justify-end">
        <button
          onClick={() => handlePrint("printable-area")}
          className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 cursor-pointer">
          Print Invoice
        </button>
      </div>

      <div className="flex justify-center p-5 min-h-screen">
        <div
          id="printable-area"
          className="bg-white shadow-lg p-6 rounded-lg w-full max-w-3xl">
          {/* Header */}
          <InvoiceHeader invoiceData={invoiceData} userData={userData} />

          {/* Customer Details */}
          <InvoiceCustomerDetails invoiceData={invoiceData} />

          <div className="mt-4">
            {/* Product Table */}
            <InvoiceItemTable invoiceData={invoiceData} />

            {/* Bank Details */}
            <InvoiceBankDetails userData={userData} />

            {/* Seal & Signature */}
            <div className="flex justify-between items-center mt-10 invoiceFooter">
              <div>
                <div className="border-t border-gray-500 w-40 mt-2"></div>
                <p className="text-gray-600">Authorized Signatory</p>
              </div>
              <div>
                <div className="border-t border-gray-500 w-40 mt-2"></div>
                <p className="text-gray-600">Authorized Seal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetails;
