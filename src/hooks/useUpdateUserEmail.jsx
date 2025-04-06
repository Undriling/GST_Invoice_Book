import { useEffect, useRef, useState } from "react";
import { auth } from "../service/firebase";
import {
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";


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


  
  useEffect(() => {
    const interval = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        if (
          emailRef.current &&
          user.email === emailRef.current &&
          user.emailVerified
        ) {
          clearInterval(interval);
          window.location.reload(); 
        }
      }
    }, 3000); 

    return () => clearInterval(interval);
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

      
      await verifyBeforeUpdateEmail(user, newEmail);

      setSuccessMsg(
        "Verification link sent to new email. Please verify to complete the update."
      );

      return { success: true };

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
