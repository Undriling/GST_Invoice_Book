import React, { useEffect, useState } from "react";
import { auth, db } from "../../../service/firebase";
import { doc, getDoc } from "firebase/firestore";

const InvoiceBankDetails = () => {
    const [userData, setUserData] = useState(null);

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

  return (
    <div className="mt-4 border p-4 rounded-lg bg-gray-50">
      <h3 className="font-bold text-gray-700">Bank Details</h3>
      <p>
        Bank Name: <span className="font-medium">{userData?.bankDetails?.bankName}</span>
      </p>
      <p>
        A/C No: <span className="font-medium">{userData?.bankDetails?.bankACNo}</span>
      </p>
      <p>
        IFSC Code: <span className="font-medium">{userData?.bankDetails?.bankIfsc}</span>
      </p>
      <p>
        UPI ID: <span className="font-medium">{userData?.bankDetails?.upiId}</span>
      </p>
    </div>
  );
};

export default InvoiceBankDetails;
