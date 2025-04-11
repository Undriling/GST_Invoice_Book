import React, { useState } from "react";
import { auth, db } from "../service/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import toast from "react-hot-toast";

const ResetAllInvoices = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetInvoices = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "invoices"),
        where("userId", "==", auth.currentUser.uid)
      );
      const snapshot = await getDocs(q);

      const deletePromises = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "invoices", docSnap.id))
      );

      await Promise.all(deletePromises);
      toast.success("All invoices have been deleted.");
    } catch (error) {
      console.error("Error deleting invoices:", error);
      alert("Error deleting invoices.");
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpenDialog(true)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md">
        Delete All Invoices
      </button>

      {openDialog && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <div className="flex justify-center items-center">
              <img
                src="/logo.jpeg"
                alt="Mudra Logo"
                className="w-70 h-30"
              />
            </div>
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Are you sure?
            </h2>
            <p className="mb-4">
              This will permanently delete your{" "}
              <strong>all saved invoices</strong>. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setOpenDialog(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button
                onClick={handleResetInvoices}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                {loading ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetAllInvoices;
