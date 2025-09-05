import { useLocation } from "react-router";
import InvoiceHeader from "./invoiceHeader";
import InvoiceBankDetails from "./invoiceBankDetails";
import InvoiceCustomerDetails from "./invoiceCustomerDetails";
import InvoiceItemTable from "./invoiceItemTable";
import usePrintInvoice from "../../../hooks/usePrintInvoice";
import useUserData from "../../../hooks/useUserData";

const InvoiceDetails = () => {
  const location = useLocation();
  const invoiceData = location.state?.invoice;
  const handlePrint = usePrintInvoice();
  const { userData } = useUserData();

  if (!invoiceData) {
    return (
      <p className="text-center text-lg">
        No invoice data found.
      </p>
    )
  }

  return (
    <>
      <div className="mt-4 text-right flex justify-end mb-3 md:mb-0">
        <button
          onClick={() => handlePrint("printable-area")}
          className="bg-blue-500 text-white md:px-4 md:py-2 rounded-md hover:bg-blue-400 hover:font-bold cursor-pointer">
          Print Invoice
        </button>
      </div>

      <div className="flex justify-center md:p-5 min-h-screen">
        <div
          id="printable-area"
          className="bg-white shadow-lg p-6 rounded-lg w-full max-w-3xl">
          {/* Header */}
          <InvoiceHeader
            invoiceData={invoiceData}
            userData={userData}
          />

          {/* Customer Details */}
          <div className="flex">
            <InvoiceCustomerDetails
              invoiceData={invoiceData}
            />
            {/* <QR_Code userData={userData}/> */}
          </div>

          <div className="mt-4 p-5">
            {/* Product Table */}
            <InvoiceItemTable invoiceData={invoiceData} />

            {/* Bank Details */}
            <InvoiceBankDetails userData={userData} />

            {/* Seal & Signature */}
            <div className="flex justify-between text-[10px] md:text-[16px] items-center mt-10 invoiceFooter">
              <div>
                {/* <div className="border-t border-gray-500 w-40 mt-2"></div>
                <p className="text-gray-600">Authorized Seal</p> */}
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <h2 className="text-sm font-bold mb-3">
                    For, {userData?.companyName}
                  </h2>
                </div>
                <div className="border-t border-gray-500 w-40 mt-4"></div>
                <div className="flex">
                  <p className="text-gray-600 mt-0">
                    Authorized Signatory
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetails;
