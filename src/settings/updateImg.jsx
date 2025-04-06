import { useState, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../service/firebase";
import toast from "react-hot-toast";

const UpdateImg = ({ photoURL }) => {
  const [preview, setPreview] = useState(photoURL);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const storageRef = ref(storage, `userPhotos/${auth.currentUser.uid}-${Date.now()}`);
      await uploadBytes(storageRef, selectedFile);
      const url = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        photoURL: url,
      });

      setPreview(url);
      setSelectedFile(null);
      toast.success("Photo updated successfully");

      window.location.reload();
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
        className="w-40 h-40 rounded-full object-fill mx-auto mb-2 cursor-pointer"
        onClick={handlePhotoClick}
        title="Click to change photo"
      />

      {!selectedFile && <h3 className="text-gray-400">Click on image to change</h3>}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handlePhotoChange}
        style={{ display: "none" }}
      />

      {selectedFile && (
        <button
          onClick={handleUpload}
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Photo"}
        </button>
      )}
    </div>
  );
};

export default UpdateImg;
