import UpdateInput from "./updateInput";
import UpdateImg from "./updateImg";
import EmailAndPassword from "./emailAndPassword/emailAndPassUpdate";
import useUserData from "../hooks/useUserData";
import Loading from "../components/custom/loading";
import ResetAllInvoices from "./resetAllInvoices";
import DeleteUserAccount from "./deleteAcc";

const Settings = () => {
  const { userData } = useUserData();

  if (!userData)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <>
    <div className="flex justify-end -mb-5 md:hidden -mt-4"> 
        <img
          src="/src/assets/logo2.jpeg"
          className="w-20 h-20 md:hidden block"
        />
      </div>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-3 md:mt-10">
        <h2 className="md:text-4xl text-3xl font-semibold mb-6 text-center text-gray-700">
          Account Settings
        </h2>

        {/* Profile Photo */}
        <UpdateImg photoURL={userData?.photoURL} />

        {/* Email & Password */}
        <div className="mt-10">
          <EmailAndPassword />
        </div>

        <h2 className="text-xl font-semibold my-7 text-center">
          Other Details
        </h2>

        {/*Public Email */}
        <UpdateInput
          label="Public Email"
          field="email"
          value={userData?.email}
        />

        {/* Phone Number */}
        <UpdateInput
          label="Phone Number"
          field="phoneNumber"
          value={userData?.phoneNumber}
        />

        {/* GST No */}
        <UpdateInput label="GST Number" field="gstNo" value={userData?.gstNo} />

        {/* Other Tax No */}
        <UpdateInput
          label="Other Tax Category (If any)"
          field="otherTaxCategory"
          value={userData?.otherTaxCategory}
        />
        <UpdateInput
          label="Other Tax Registration No."
          field="otherTaxRegistrationNo"
          value={userData?.otherTaxRegistrationNo}
        />

        {/* Bank Details */}
        <UpdateInput
          label="Bank Name"
          field="bankDetails.bankName"
          value={userData?.bankDetails?.bankName}
        />
        <UpdateInput
          label="Account Number"
          field="bankDetails.bankACNo"
          value={userData?.bankDetails?.bankACNo}
        />
        <UpdateInput
          label="Account Type"
          field="bankDetails.bankACType"
          value={userData?.bankDetails?.bankACType}
        />
        <UpdateInput
          label="IFSC Code"
          field="bankDetails.bankIfsc"
          value={userData?.bankDetails?.bankIfsc}
        />
        <UpdateInput
          label="UPI ID"
          field="bankDetails.upiId"
          value={userData?.bankDetails?.upiId}
        />
      </div>

      <div className="flex justify-center items-center text-center bg-gray-600 max-w-3xl mx-auto p-6 rounded-lg shadow mt-10">
        <div className="my-3">
          <p className="text-red-500 font-bold md:text-xl text-lg mb-5">
            This will permanently delete your <strong>all saved invoices</strong>.
          </p>
          <ResetAllInvoices />
        </div>
      </div>

      <div className="flex justify-center items-center text-center bg-gray-600 max-w-3xl mx-auto p-6 rounded-lg shadow mt-10">
        <div className="my-3">
          <p className="text-red-500 font-bold md:text-xl text-lg mb-5">
            This will permanently delete your <strong>account & all saved information and data</strong>.
          </p>
          <DeleteUserAccount />
        </div>
      </div>
    </>
  );
};

export default Settings;
