// components/AddEmployeeForm.js
import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, db } from "../../service/firebase";
import toast from "react-hot-toast";

const AddEmployeeForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    empId: "",
    govtId: "",
    photoUrl: "",
    salary: "",
    joiningDate: "",
    address: "",
    balanceAmt: "",
    userId: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.empId || !form.salary || !form.joiningDate || !form.address)
      return toast.success("Please fill in required fields");

    try {
      await addDoc(collection(db, "employees"), {
        ...form,
        salary: parseFloat(form.salary),
        balanceAmt: parseFloat(form.balanceAmt || 0),
        userId: auth.currentUser.uid,
        createdAt: Timestamp.now(),
      });
      toast.success("Employee added successfully");
      onAdd(); 
      setForm({
        name: "",
        empId: "",
        govtId: "",
        photoUrl: "",
        salary: "",
        joiningDate: "",
        address: "",
        balanceAmt: "",
        userId: auth.currentUser?.uid
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add employee");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border rounded shadow mb-6">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Employee Name" className="p-2 border rounded" required />
      <input name="empId" value={form.empId} onChange={handleChange} placeholder="Employee ID" className="p-2 border rounded" required />
      <input name="govtId" value={form.govtId} onChange={handleChange} placeholder="Govt ID Number" className="p-2 border rounded" />
      <input name="photoUrl" value={form.photoUrl} onChange={handleChange} placeholder="Photo URL" className="p-2 border rounded" />
      <input name="salary" value={form.salary} onChange={handleChange} type="number" placeholder="Salary" className="p-2 border rounded" required />
      <input name="joiningDate" value={form.joiningDate} onChange={handleChange} type="date" className="p-2 border rounded" required />
      <input name="balanceAmt" value={form.balanceAmt} onChange={handleChange} type="number" placeholder="Balance Amount" className="p-2 border rounded" />
      <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" className="p-2 border rounded sm:col-span-2" />
      <button type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 sm:col-span-2">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;
