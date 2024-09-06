import "./ImageUploader.css";
import React, { useState } from "react";
import postToImageStore from "./imageApi.js";

// Code taken from
// https://uploadcare.com/blog/how-to-upload-file-in-react/
const ImageUploader = ({ destination }) => {
  const [file, setFile] = useState(null);

  // ["initial" | "uploading" | "success" | "fail"]
  const [status, setStatus] = useState("initial");

  const uploadImageFile = async () => {
    if (!file) {
      setStatus("initial");
      return;
    }

    setStatus("uploading");

    postToImageStore(file).then(
      () => setStatus("success"),
      () => setStatus("fail")
    );
  };

  const selectFile = (e) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="input-group fileuploader">
        <label htmlFor="file" className="sr-only">
          
        </label>
        <input id="file" type="file" onChange={selectFile} />
      </div>

      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button onClick={uploadImageFile} className="submit">
          Upload
        </button>
      )}

      <UploadResult status={status} />
    </>
  );
};

const UploadResult = ({ status }) => {
  if (status === "success") {
    return <p>✅ File uploaded successfully!</p>;
  }

  if (status === "fail") {
    return <p>❌ File upload failed!</p>;
  }

  if (status === "uploading") {
    return <p>⏳ Uploading selected file...</p>;
  }

  return null;
};

export default ImageUploader;
