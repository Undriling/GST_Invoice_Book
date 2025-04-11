import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../service/firebase";
import { useNavigate } from "react-router";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home"); 
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      const user = userCredential.user
      navigate("/home");
      const userDoc = await getDoc(doc(db, 'users', user.uid))

      if (userDoc.exists()) {
        console.log("User Data", userDoc.data())
      }
      else {
        console.log("No user Data Found!")
      }
        // })
        // .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        //   console.log(errorCode, errorMessage);
        // });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }

  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gray-300 p-4">
      <div className="">
        <img
          src="/logo.jpeg"
          alt="Logo"
          className="w-72 mb-6"
        />
      </div>
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side*/}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="/login.jpeg"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-gray-200 text-[#8046FD]">
          <h2 className="text-2xl font-extrabold  text-center mb-6">Login</h2>
          <form className="space-y-4" onSubmit={loginSubmitHandler}>
            <div>
              <label className="block font-bold pb-2">
                Email <span className="text-red-700">*</span>
              </label>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full p-3 h-full border-2 border-[#8046FD] rounded-lg text-gray-700 font-bold focus:outline-none bg-gray-300"
                placeholder="Enter your email id."
                required
              />
            </div>
            <div>
              <label className="block font-bold pb-2">
                Password <span className="text-red-700">*</span>
              </label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full p-3 h-full border-2 rounded-lg font-bold text-gray-700 focus:outline-none border-[#8046FD] bg-gray-300"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#8046FD] text-white p-3 rounded-lg hover:bg-blue-600 transition">
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-[#8046FD] font-extrabold hover:text-blue-600">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
