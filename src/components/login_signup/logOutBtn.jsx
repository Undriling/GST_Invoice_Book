import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../service/firebase";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/"); 
    } catch (error) {
      // console.error("Logout Error:", error.message);
      toast.error(error.code)
    }
  };

  return (
    <p onClick={handleLogout} className="bg-none text-black rounded-md">
      Logout
    </p>
  );
};

export default LogoutButton;
