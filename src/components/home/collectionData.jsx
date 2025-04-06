import React, { useEffect, useState } from "react";
import { auth, db } from "../../service/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const CollectionData = () => {
    const [invoices, setInvoices] = useState([]);
    const [total, setTotal] = useState(0);
    const [monthTotal, setMonthTotal] = useState(0);
    const [monthCashTotal, setMonthCashTotal] = useState(0);
    const [monthUpiTotal, setMonthUpiTotal] = useState(0);

    useEffect (() => {
        getInvoiceData();
    },[])
    
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
    
          console.log("User Invoice Details", data);
          
          setInvoices(data)
          overallSales(data)
          thisMonthTotal(data)
          thisMonthCashTotal(data)
          thisMonthUpiTotal(data)

        } catch (error) {
          console.log(error);
        }
      };

      const overallSales = (invoiceList) => {
        var t =0;
        invoiceList.forEach ((data) => {
            t += data.productsTotal
        })
        setTotal(t);
      }

      const thisMonthTotal = (invoiceList) => {
        var mt = 0;
        
        invoiceList.forEach ((data) => {
            if ( new Date(data?.date?.seconds * 1000).getMonth() == new Date().getMonth() ) {
                mt += data.productsTotal
            }
        })
        setMonthTotal(mt)
      }

      const thisMonthCashTotal = (invoiceList) => {
        var mct = 0;
        invoiceList.forEach ((data) => {
            if ( new Date(data?.date?.seconds * 1000).getMonth() == new Date().getMonth() ) {
                if (data.customerDetails.paidBy == "CASH") {
                    mct += data.productsTotal
                }
            }
        })
        setMonthCashTotal(mct)
        setMonthUpiTotal
      }

      const thisMonthUpiTotal = (invoiceList) => {
        var mut = 0;
        invoiceList.forEach ((data) => {
            if ( new Date(data?.date?.seconds * 1000).getMonth() == new Date().getMonth() ) {
                if (data.customerDetails.paidBy == "UPI" || data.customerDetails.paidBy == "CHEQUE") {
                    mut += data.productsTotal
                }
            }
        })
        setMonthUpiTotal(mut)
      }



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      
      <div
        className="rounded-2xl shadow-lg text-white bg-green-400 p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50">
        <h2 className="text-2xl font-semibold">{total}</h2>
        <p className="text-lg text-red-500 font-bold">Overall Sales</p>
      </div>
    
      <div
        className="rounded-2xl shadow-lg text-white bg-cyan-500 p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50">
        <h2 className="text-2xl font-semibold">{monthTotal}</h2>
        <p className="text-lg text-red-500 font-bold">This Month's Sales</p>
      </div>

      <div
        className="rounded-2xl shadow-lg text-white bg-[#8046FD] p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50">
        <h2 className="text-2xl font-semibold ">{invoices.length}</h2>
        <p className="text-lg text-red-500 font-bold">Invoices</p>
      </div>

      <div
        className={`rounded-2xl shadow-lg text-white bg-[#467dfd] p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50`}>
        <h2 className={`text-2xl font-semibold `}>{monthCashTotal}</h2>
        <p className="text-lg text-yellow-100">This Month's Sales by Cash</p>
      </div>

      <div
        className={`rounded-2xl shadow-lg text-white bg-gray-500 p-6 bg-gradient-to-r flex flex-col justify-center items-center h-50`}>
        <h2 className={`text-2xl font-semibold `}>{monthUpiTotal}</h2>
        <p className="text-lg text-yellow-100">This Month's Sales by UPI/Cheque</p>
      </div>
    </div>
  );
};

export default CollectionData;
