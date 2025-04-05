import { useEffect, useRef, useState } from "react";
import { auth, db } from "../service/firebase";
import {
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const useUserEmailUpdate = () => {
  const emailRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentEmail(user.email);
    });
    return unsubscribe;
  }, []);

  const updateUserEmail = async (newEmail, password) => {
    setLoading(true);
    setError("");
    setSuccessMsg("");
    emailRef.current = newEmail;

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      // ✅ This sends a verification email to the new address.
      await verifyBeforeUpdateEmail(user, newEmail);

      setSuccessMsg(
        "Verification link sent to new email. Please verify to complete the update."
      );

      // ❗ DO NOT update Firestore yet — only after user verifies the email.

      // ✅ Monitor Auth state to sync Firestore after email verification
      // Poll every 3 seconds to detect if user has verified the new email
      const poll = setInterval(async () => {
        await user.reload();
        if (user.emailVerified && user.email === newEmail) {
          clearInterval(poll);

          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, { email: newEmail });

          setSuccessMsg("✅ Email updated in Firebase Auth and Firestore!");
        }
      }, 3000);


    } catch (err) {
      console.error("Email update failed:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { currentEmail, updateUserEmail, loading, error, successMsg };
};

export default useUserEmailUpdate;
