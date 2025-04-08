import { useEffect, useState } from "react";
import { auth, db } from "../service/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const useGetPendingPayments = () => {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBalances = async () => {
    try {
      const q = query(
        collection(db, "paymentBalance"),
        where("userId", "==", auth.currentUser.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBalances(data);
    } catch (err) {
      console.error("Failed to fetch balances:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, []);

  return { balances, loading, refetch: fetchBalances };
};

export default useGetPendingPayments;
