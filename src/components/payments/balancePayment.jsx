import React, { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import useGetPendingPayments from "../../hooks/useGetPendingPayments";
import useAddPaymentBalance from "../../hooks/useAddPaymentBalance";
import { db } from "../../service/firebase";
import toast from "react-hot-toast";

const BalancePayment = () => {
  const { balances, loading, refetch } = useGetPendingPayments();
  const { addPaymentEntry, loading: adding } = useAddPaymentBalance();

  const [form, setForm] = useState({
    amount: "",
    type: "RECEIVED",
    payerName: "",
    paidTo: "",
    description: "",
    paymentMethod: "CASH",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.type)
      return toast.success("Fill all required fields");

    const { success, error } = await addPaymentEntry(form);
    if (success) {
      toast.success("Entry added successfully!");
      setForm({
        amount: "",
        type: "RECEIVED",
        payerName: "",
        paidTo: "",
        description: "",
        paymentMethod: "CASH",
      });
      refetch();
    } else {
      toast.error("Error: " + error);
    }
  };

  const deleteEntry = async (id) => {
    const isConfirm = window.confirm("Delete this entry?");
    if (!isConfirm) return;
    try {
      await deleteDoc(doc(db, "paymentBalance", id));
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const total = (type) =>
    balances
      .filter((b) => b.type === type)
      .reduce((sum, b) => sum + Number(b.amount), 0);

  return (
    <>
      <div className="flex justify-end md:hidden -mt-4">
        <img
          src="/logo2.jpeg"
          className="w-20 h-20 md:hidden block"
        />
      </div>

      <div className="p-4 max-w-4xl mx-auto -mt-2 md:mt-3 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4">💰 Payments Tracker</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border p-2 rounded">
            <option value="RECEIVED">Received</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
          </select>
          <input
            type="text"
            name="payerName"
            placeholder="Payer Name"
            value={form.payerName}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="paidTo"
            placeholder="Paid To"
            value={form.paidTo}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded col-span-1 sm:col-span-2"
          />
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="border p-2 rounded">
            <option value="CASH">Cash</option>
            <option value="UPI">UPI</option>
            <option value="UPI">Cheque</option>
            <option value="BANK">Bank Transfer</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
            disabled={adding}>
            {adding ? "Adding..." : "Add Entry"}
          </button>
        </form>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-200 md:p-4 p-5 rounded-md shadow">
            <h3 className="md:text-lg text-[15px] font-semibold text-gray-700">
              Total Received
            </h3>
            <p className="md:text-xl text-lg font-bold text-green-600">
              ₹ {total("RECEIVED")}
            </p>
          </div>
          <div className="bg-red-200 md:p-4 p-5 rounded-md shadow">
            <h3 className="md:text-lg text-[15px] font-semibold text-gray-700">
              Total Paid
            </h3>
            <p className="md:text-xl text-lg font-bold text-red-600">
              ₹ {total("PAID")}
            </p>
          </div>
          <div className="bg-yellow-200 md:p-4 p-5 rounded-md shadow">
            <h3 className="md:text-lg text-[15px] font-semibold text-gray-700">
              Total Pending
            </h3>
            <p className="md:text-xl text-lg font-bold text-yellow-600">
              ₹ {total("PENDING")}
            </p>
          </div>
        </div>

        <h3 className="md:text-xl text-lg font-semibold mb-2">
          🔍 All Entries
        </h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {balances.map((entry) => (
              <li
                key={entry.id}
                className="border p-4 rounded-2xl shadow-md flex justify-between items-center">
                <div className="text-sm md:text-lg">
                  <p>
                    <strong>{entry.type}</strong>:{" "}
                    <span className="text-[17px]">
                      ₹{entry.amount} by {entry.paymentMethod}{" "}
                    </span>
                  </p>
                  <div className="flex gap-4">
                    {entry.payerName && (
                      <p>
                        <b>From:</b> {entry.payerName} .
                      </p>
                    )}
                    {entry.paidTo && (
                      <p>
                        <b>To:</b> {entry.paidTo} .
                      </p>
                    )}
                  </div>
                  {entry.description && (
                    <p className="text-[17px] text-gray-600">
                      {entry.description}
                    </p>
                  )}
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteEntry(entry.id)}>
                  🗑️ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default BalancePayment;
