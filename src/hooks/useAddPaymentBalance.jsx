import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, db } from "../service/firebase";

const useAddPaymentBalance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addPaymentEntry = async ({
    amount,
    type,
    payerName = "",
    paidTo = "",
    description = "",
    paymentMethod = "CASH",
  }) => {
    setLoading(true);
    setError(null);

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("User not authenticated");

      const newEntry = {
        userId: userId || "",
        amount: parseFloat(amount) || 0,
        type: type || "RECEIVED",
        payerName: payerName || "",
        paidTo: paidTo || "",
        description: description || "",
        paymentMethod: paymentMethod?.toUpperCase() || "CASH",
        date: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, "paymentBalance"), newEntry);
      return { success: true, id: docRef.id };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { addPaymentEntry, loading, error };
};

export default useAddPaymentBalance;
