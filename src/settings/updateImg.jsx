import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../service/firebase";

const UpdateImg = ({ photoURL }) => {
  const [preview, setPreview] = useState(photoURL);
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const storageRef = ref(storage, `userPhotos/${auth.currentUser.uid}-${Date.now()}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        photoURL: url,
      });
      setPreview(url);
      alert("Photo updated!");
    } catch (err) {
      console.error("Error uploading photo", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 text-center">
      <img
        src={preview}
        alt="Profile"
        className="w-40 h-40 rounded-full object-fill mx-auto mb-2"
      />
      <input type="file" accept="image/*" onChange={handlePhotoChange} className="text-center" />
      {loading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
    </div>
  );
};

export default UpdateImg;
