import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../service/firebase";
import Loading from "../custom/loading";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <Loading/>

  return user ? children : null;
};

export default ProtectedRoute;
