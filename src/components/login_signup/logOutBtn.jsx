import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../service/firebase";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); 
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <p onClick={handleLogout} className="bg-none text-black rounded-md">
      Logout
    </p>
  );
};

export default LogoutButton;
