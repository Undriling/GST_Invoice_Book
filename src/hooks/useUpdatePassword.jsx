import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../service/firebase";

const useUpdateUserPassword = () => {
  const updateUserPassword = async (currentPassword, newPassword) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user");

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);

      return { success: true, message: "Password updated successfully." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return updateUserPassword;
};

export default useUpdateUserPassword;
