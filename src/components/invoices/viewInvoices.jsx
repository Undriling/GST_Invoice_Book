import React, { useEffect, useState } from "react";
import { db } from "../../service/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
// import { AiTwotoneDelete } from "react-icons/ai";
import { LocateIcon, MapPin, TrashIcon } from "lucide-react";
// import { data } from "react-router";


const ViewInvoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "invoices"));
    // console.log(querySnapshot.docs)
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setInvoices(data);
    console.log(data);
  };

  const deleteInvoice = async (id) => {
    const isConfirm = window.confirm("Are you sure? You wants to delete...")

    if (isConfirm) {
      try{
        await deleteDoc(doc(db, 'invoices', id))
        getData()
      } 
      catch {
        window.alert("Something went wrong! Please try again...")
      }
    }
  }

  return (
    <div>
      <h1>Invoices</h1>
      {invoices.map((data,index) => (
        <div key={data.id} className="flex justify-between bg-white my-3  items-center p-2 rounded-2xl">
          <p>{index+1}.</p>
          <p className="w-[10%]">{data.customerDetails.to}</p>
          <p className="w-[10%]">
            {new Date(data?.date?.seconds * 1000).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          <p className="w-[10%]">📍{data.customerDetails.address}</p>
          <p className="w-[10%]">₹ {data.productsTotal}</p>
          <button className="items-center" onClick={() => {deleteInvoice(data.id)}}><TrashIcon className="w-5 h-5 text-red-500 hover:text-red-800" /></button>
          <button className="text-[#8046FD] font-extrabold text-lg hover:text-blue-700">Invoice</button>
        </div>
      ))}
    </div>
  );
};

export default ViewInvoices;
