import { useState } from "react";
import useUpdatePassword from "../../hooks/useUpdatePassword";

const UserPasswordUpdate = () => {
  const updatePassword = useUpdatePassword();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, message: "", success: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", success: null });

    const result = await updatePassword(currentPassword, newPassword);

    setStatus({
      loading: false,
      message: result.message,
      success: result.success,
    });

    if (result.success) {
      setCurrentPassword("");
      setNewPassword("");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded-md mt-6">
      <h2 className="text-lg font-semibold mb-4">Update Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          disabled={status.loading}
        >
          {status.loading ? "Updating..." : "Update Password"}
        </button>
      </form>

      {status.message && (
        <p className={`mt-4 text-sm ${status.success ? "text-green-600" : "text-red-600"}`}>
          {status.message}
        </p>
      )}
    </div>
  );
};

export default UserPasswordUpdate;
