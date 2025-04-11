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
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";

const DeleteUserAccount = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetInvoices = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "invoices"),
        where("userId", "==", auth.currentUser.uid)
      );

      const qII = query(
        collection(db, "paymentBalance"),
        where("userId", "==", auth.currentUser.uid)
      );

      const qIII = query(
        collection(db, "employees"),
        where("userId", "==", auth.currentUser.uid)
      );

      const qIV = query(
        collection(db, "users"),
        where("uid", "==", auth.currentUser.uid)
      );

      const snapshot = await getDocs(q);

      const snapshotII = await getDocs(qII);

      const snapshotIII = await getDocs(qIII);

      const snapshotIV = await getDocs(qIV);

      const invoicesDeletePromises = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "invoices", docSnap.id))
      );

      const paymentBalanceDeletePromises = snapshotII.docs.map((docSnap) =>
        deleteDoc(doc(db, "paymentBalance", docSnap.id))
      );

      const employeesDeletePromises = snapshotIII.docs.map((docSnap) =>
        deleteDoc(doc(db, "employees", docSnap.id))
      );

      const userDeletePromises = snapshotIV.docs.map((docSnap) =>
        deleteDoc(doc(db, "users", docSnap.id))
      );

      await Promise.all(invoicesDeletePromises);

      await Promise.all(paymentBalanceDeletePromises);

      await Promise.all(employeesDeletePromises);

      await Promise.all(userDeletePromises);

      await signOut(auth);
      navigate("/signup");

      toast.success("Your account have been deleted permanently.");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Error deleting account.");
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
        Delete your account permanently
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
              This will permanently delete your <strong>account & all saved information and data</strong>. This action cannot be undone.
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

export default DeleteUserAccount;
