import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../service/firebase";

const UpdateInput = ({ label, field, value }) => {
  const [input, setInput] = useState(value || "");
  const [loading, setLoading] = useState(false);

  const updateField = async () => {
    try {
      setLoading(true);
      const userRef = doc(db, "users", auth.currentUser.uid);
      const fieldObj = field.includes(".")
        ? field.split(".").reduceRight((acc, curr) => ({ [curr]: acc }), input)
        : { [field]: input };
      await updateDoc(userRef, fieldObj);
      alert(`${label} updated successfully`);
    } catch (err) {
      console.error("Error updating field:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={updateField}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default UpdateInput;
