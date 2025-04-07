import React, { useEffect, useState } from "react";
import { auth, db } from "../service/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const useInvoice_Collection = () => {
  const [invoices, setInvoices] = useState([]);
  const [total, setTotal] = useState(0);
  const [thisMonthTotal, setThisMonthTotal] = useState(0);
  const [lastMonthTotal, setLastMonthTotal] = useState(0);
  const [monthCashTotal, setMonthCashTotal] = useState(0);
  const [monthUpiTotal, setMonthUpiTotal] = useState(0);
  const [loading, setLoading] = useState();

  useEffect(() => {
    getInvoiceData();
  }, []);

  const getInvoiceData = async () => {
    setLoading(true);
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

      console.log("User Invoice Details", data);

      setInvoices(data);
      invoicesSalesReports(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const invoicesSalesReports = (invoiceList) => {
    const lastMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      1
    );
    const thisMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    let t = 0;
    let mt = 0;
    let lmt = 0;
    let mct = 0;
    let mut = 0;

    invoiceList.forEach((data) => {
      // Overall Sales
      t += data.productsTotal;

      // This Month Sales
      if (
        new Date(data?.date?.seconds * 1000).getMonth() == new Date().getMonth()
      ) {
        mt += data.productsTotal;
      }

      //  Last Month Sales
      if (new Date(data?.date?.seconds * 1000) >= lastMonth && new Date(data?.date?.seconds * 1000) < thisMonth) {
        lmt += data.productsTotal;
      }

      // This Month Slaes By Cash
      if (
        new Date(data?.date?.seconds * 1000).getMonth() == new Date().getMonth()
      ) {
        if (data?.customerDetails?.paidBy == "CASH") {
          mct += data?.productsTotal;
        }
      }

      // This Month Slaes By UPI
      if (
        new Date(data?.date?.seconds * 1000).getMonth() == new Date().getMonth()
      ) {
        if (
          data.customerDetails.paidBy == "UPI" ||
          data.customerDetails.paidBy == "CHEQUE"
        ) {
          mut += data.productsTotal;
        }
      }

      setTotal(t);
      setThisMonthTotal(mt);
      setLastMonthTotal(lmt);
      setMonthCashTotal(mct);
      setMonthUpiTotal(mut);
    });
  };

  return {
    invoices,
    total,
    thisMonthTotal,
    lastMonthTotal,
    monthCashTotal,
    monthUpiTotal,
    loading,
  };
};

export default useInvoice_Collection;
