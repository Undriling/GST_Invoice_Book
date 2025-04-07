import React, { useEffect, useState } from "react";
import useInvoice_Collection from "./useInvoice_Collection";

const useDailySales = () => {
  const { invoices } = useInvoice_Collection();
  const [todaySales, setTodaySales] = useState(0);
  const [yesterdaySales, setYesterdaySales] = useState(0);
  const [todayCashTotal, setTodayCashTotal] = useState(0);
  const [todayUpiTotal, setTodayUpiTotal] = useState(0);

  useEffect(() => {
    calculateDailySales();
  }, [invoices]);

  const calculateDailySales = () => {
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);

    let tTotal = 0;
    let yTotal = 0;
    let tCash = 0;
    let tUpi = 0;

    invoices.forEach((invoice) => {
      const date = new Date(invoice?.date?.seconds * 1000);
      const paidBy = invoice?.customerDetails?.paidBy;
      const total = invoice.productsTotal;

      const isToday = date >= todayStart;
      const isYesterday = date >= yesterdayStart && date < todayStart;

      if (isToday) {
        if (paidBy === "CASH") {
          tCash += total;
          tTotal += total;
        } else if (paidBy === "UPI" || paidBy === "CHEQUE") {
          tUpi += total;
          tTotal += total;
        }
      } else if (isYesterday && (paidBy === "CASH" || paidBy === "UPI")) {
        yTotal += total;
      }
    });

    setTodaySales(tTotal);
    setYesterdaySales(yTotal);
    setTodayCashTotal(tCash);
    setTodayUpiTotal(tUpi);
  };

  return { todaySales, yesterdaySales, todayCashTotal, todayUpiTotal };
};

export default useDailySales;
