import React, { useEffect, useState } from "react";
import { auth, db } from "../service/firebase";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const useUserData = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          toast.error("No user Data Found!");
        }
      }
    };

    fetchUserData();
  }, []);

  return { userData };
};

export default useUserData;
