import React, { useEffect, useState } from "react";
import { auth, db } from "../../service/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FileText, TrashIcon } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";

const ViewInvoices = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        getInvoiceData(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const getInvoiceData = async () => {
    try {
      const q = query(
        collection(db, "invoices"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot.docs)
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setInvoices(data);
      console.log("User Invoice Details", data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteInvoice = async (id) => {
    const isConfirm = window.confirm("Are you sure? You wants to delete...");

    if (isConfirm) {
      try {
        await deleteDoc(doc(db, "invoices", id));
        getInvoiceData(user?.uid);
      } catch {
        window.alert("Something went wrong! Please try again...");
      }
    }
  };


  return (
    <div>
      <h1>Invoices</h1>
      {invoices.length > 0 && (
        <div className="flex gap-5">
          <div className="flex items-center text-gray-600 text-sm">
            <p>Click</p>
            <FileText className="w-4 h-4 mx-2" />
            <p>to View Invoice</p>
          </div>
          <h2>|</h2>
          <div className="flex items-center text-gray-600 text-sm">
            <p>Click</p>
            <TrashIcon className="w-4 h-4 mx-2" />
            <p>to Delete Invoice</p>
          </div>
        </div>
      )}

      {invoices.length > 0 ? (
        invoices.map((data, index) => (
          <div
            key={data.id}
            className="flex justify-between bg-white my-3  items-center p-2 rounded-2xl">
            <p className="w-[7%]">{index + 1}.</p>
            <p className="w-[23%]">{data.customerDetails?.to}</p>
            <h2 className="px-2">-</h2>
            <p className="w-[25%] text-center">
              {data.date
                ? new Date(data?.date?.seconds * 1000).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )
                : ""}
            </p>
            <h2 className="px-2">-</h2>
            <p className="w-[27%] text-center">
              📍{data.customerDetails?.address}
            </p>
            <h2 className="px-2">-</h2>
            <p className="w-[40%] text-center">
              ₹ {data.productsTotal?.toFixed(2)}
            </p>
            <h2 className="px-1 text-blue-600">|</h2>

            <button className="text-[#8046FD] font-extrabold text-lg hover:text-blue-700">
              <FileText className="w-6 h-6" onClick={() => navigate("/home/invoice-details", { state: { invoice: data } })}/>
            </button>

            <button
              className="items-center"
              onClick={() => {
                deleteInvoice(data.id);
              }}>
              <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-800" />
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center text-lg mt-10">
          Looks like you haven't added any invoices yet. Click "Create Invoice"
          to create one...
        </p>
      )}
    </div>
  );
};

export default ViewInvoices;
