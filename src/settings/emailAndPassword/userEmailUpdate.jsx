import { useState } from "react";
import useUserEmailUpdate from "../../hooks/useUpdateUserEmail";

const UserEmailUpdate = () => {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentEmail, updateUserEmail, loading, error, successMsg } =
    useUserEmailUpdate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserEmail(newEmail, password);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <div>
          <label className="block text-sm font-bold mb-2">
            Logged In Email Id
          </label>
          <input
            type="email"
            value={currentEmail}
            disabled
            className="w-full border bg-gray-100 p-2 rounded"
          />
        </div>
      <h2 className="text-lg font-bold my-4">Update Email</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={loading}>
          {loading ? "Updating..." : "Update Email"}
        </button>
      </form>
      {error && (
        <p className="text-red-600 mt-3">Email update failed: {error}</p>
      )}
      {successMsg && <p className="text-green-600 mt-3">{successMsg}</p>}
    </div>
  );
};

export default UserEmailUpdate;
