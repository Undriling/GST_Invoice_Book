import React, { useState } from "react";
import { auth, db, storage } from "../../service/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

const SignUp = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [displayName, setDisplayName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [file, setFile] = useState(null);
  const [otherTaxName, setOtherTaxName] = useState("");
  const [otherTaxNo, setOtherTaxNo] = useState("");
  const [bankName, setBankName] = useState();
  const [bankACNo, setBankACNo] = useState();
  const [bankIfsc, setIfsc] = useState("");
  const [bankACType, setBnakACType] = useState("");
  const [upiId, setUpiId] = useState();

  const registerSubmitHandler = (e) => {
    e.preventDefault();
    console.log(
      email,
      phoneNo,
      password,
      displayName,
      ownerName,
      gstNo,
      file,
      otherTaxName,
      otherTaxNo
    );

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);
        console.log(user);

        // upload logo to firestorage
        uploadBytesResumable(storageRef, file).then((res) => {
          console.log(res);
          // fetch photo url from firestorage
          getDownloadURL(storageRef).then((downloadUrl) => {
            console.log(downloadUrl);

            // update usercredential json details
            updateProfile(userCredential.user, {
              displayName: displayName,
              phoneNumber: phoneNo,
              photoURL: downloadUrl,
            });

            // User Data To Firebase Database -> users
            setDoc(doc(db, "users", userCredential.user.uid), {
              uid: userCredential.user.uid,
              companyName: displayName,
              ownerName: ownerName,
              email: email,
              phoneNumber: phoneNo,
              gstNo: gstNo,
              otherTaxCategory: otherTaxName,
              otherTaxRegistrationNo: otherTaxNo,
              bankDetails: {
                bankName: bankName,
                bankACNo: bankACNo,
                bankIfsc: bankIfsc,
                bankACType: bankACType,
                upiId: upiId
              },
              photoURL: downloadUrl,
            });

            navigate("/")
          });
          console.log(res);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gray-300 p-4">
      <div className="">
        <img
          src="../../src/assets/logo.jpeg"
          alt="Logo"
          className="w-72 mb-6"
        />
      </div>
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side*/}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="../../src/assets/login.jpeg"
            alt="SignUp"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-gray-200 text-[#8046FD]">
          <h2 className="text-2xl font-extrabold  text-center mb-6">Sign Up</h2>
          <h2 className="font-extrabold  text-center mb-6 text-gray-400">
            Create your account
          </h2>
          <form className="space-y-4" onSubmit={registerSubmitHandler}>
            <div>
              <label className="block font-bold pb-2">
                Company Name <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
                className="w-full p-3 border-2 h-full rounded-lg text-gray-700 font-bold focus:outline-none border-[#8046FD] bg-gray-300"
                placeholder="Enter your company name"
                required
              />
            </div>
            <div>
              <label className="block font-bold pb-2">
                Owner Name <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setOwnerName(e.target.value);
                }}
                className="w-full p-3 border-2 h-full rounded-lg text-gray-700 font-bold focus:outline-none border-[#8046FD] bg-gray-300"
                placeholder="Enter owner name"
                required
              />
            </div>
            <div>
              <label className="block font-bold pb-2">
                GST No. <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setGstNo(e.target.value);
                }}
                className="w-full p-3 border-2 h-full rounded-lg text-gray-700 font-bold focus:outline-none border-[#8046FD] bg-gray-300"
                placeholder="Enter your GST No."
                required
              />
            </div>
            <div>
              <label className="block font-bold pb-2">
                Other Tax Registration No. (If any)
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setOtherTaxName(e.target.value);
                }}
                className="w-full p-3 mb-3 border-2 h-full rounded-lg text-gray-700 font-bold focus:outline-none border-[#8046FD] bg-gray-300"
                placeholder="Enter your tax category"
              />
              <input
                type="text"
                onChange={(e) => {
                  setOtherTaxNo(e.target.value);
                }}
                className="w-full p-3 border-2 h-full rounded-lg text-gray-700 font-bold focus:outline-none border-[#8046FD] bg-gray-300"
                placeholder="Enter your registration no."
              />
            </div>

            {/* Bank Details */}
            <div>
              <label className="block font-bold pb-2">
                Bank Details <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setBankName(e.target.value);
                }}
                className="w-full p-3 border-2 h-full rounded-lg text-gray-700 font-bold focus:outline-none border-[#8046FD] bg-gray-300"
                placeholder="Enter Bank Name"
                required
              />
              <input
                type="number"
                onChange={(e) => {
                  setBankACNo(e.target.value);
                }}
                className="w-full p-3 my-3 border-2 h-full rounded-lg text-gray-700 font-bold focus:outline-none border-[#8046FD] bg-gray-300"
                placeholder="Enter A/C No."
                required
              />
              <input
                type="text"
                onChange={(e) => {
                  setIfsc(e.target.value);
                }}
                className="w-full p-3 border-2 h-full rounded-lg text-gray-700 font-bold focus:outline-none border-[#8046FD] bg-gray-300"
                placeholder="Enter IFSC Code"
                required
              />
              <input
                type="text"
                onChange={(e) => {
                  setBnakACType(e.target.value);
                }}
                className="w-full p-3 my-3 border-2 h-full rounded-lg text-gray-700 font-bold focus:outline-none border-[#8046FD] bg-gray-300"
                placeholder="Enter A/C Type (Current / Savings)"
                required
              />
              <input
                type="text"
                onChange={(e) => {
                  setUpiId(e.target.value);
                }}
                className="w-full p-3 border-2 h-full rounded-lg text-gray-700 font-bold focus:outline-none border-[#8046FD] bg-gray-300"
                placeholder="Enter UPI Id (If any)"
              />
            </div>

            <div>
              <label className="block font-bold pb-2">
                Phone No. <span className="text-red-700">*</span>
              </label>
              <input
                type="number"
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                }}
                className="w-full p-3 border-2 h-full rounded-lg text-gray-700 font-bold focus:outline-none border-[#8046FD] bg-gray-300"
                placeholder="Enter your 10 digit phone no."
                required
              />
            </div>
            <div>
              <label className="block font-bold pb-2">
                Email <span className="text-red-700">*</span>
              </label>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full p-3 border-2 h-full rounded-lg text-gray-700 font-bold focus:outline-none border-[#8046FD] bg-gray-300"
                placeholder="Enter your email"
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
                className="w-full p-3 border-2 h-full rounded-lg font-bold text-gray-700 focus:outline-none border-[#8046FD] bg-gray-300"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="">
              <label className="block font-bold pb-2 w-full justify-center items-center">
                Logo (If any)
              </label>
              <input
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                className="w-full cursor-pointer p-3 rounded-lg font-bold text-gray-700 focus:outline-none border-[#8046FD] bg-gray-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#8046FD] text-white p-3 rounded-lg hover:bg-blue-600 transition">
              Sign Up
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a
              href="/"
              className="text-[#8046FD] font-extrabold hover:text-blue-600">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
