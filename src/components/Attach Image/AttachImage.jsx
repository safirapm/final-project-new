import axios from "axios";
import { useRef, useState } from "react";
import "./AttachImage.css";

const AttachImage = ({ onChange }) => {
  const [savePicture, setSavePicture] = useState("");

  const fileUpload = useRef(null);

  function handleUploadChange(e) {
    console.log(e.target.files[0]);
    let uploaded = e.target.files[0];
    setSavePicture(uploaded);
  }

  function uploadImage() {
    if (!savePicture) {
      alert("Please upload an image first.");
    } else {
      console.log(fileUpload.current.files[0]);
      let formData = new FormData();
      formData.append("image", savePicture);

      let configurasi = {
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
          Authorization: `Bearer${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(
          `${process.env.REACT_APP_BASEURL}api/v1/upload-image`,
          formData,
          configurasi
        )
        .then(function (response) {
          console.log(response);
          onChange(response.data.url);
          alert("Uploading picture successful.");
        })
        .catch(function (error) {
          console.log(error);
          alert(
            "Uploading picture failed. Please try again. (File is too big/invalid image)."
          );
        })

        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <>
      <div className="d-flex mb-2">
        <input
          id="formFile"
          ref={fileUpload}
          type="file"
          accepts="image/*"
          onChange={handleUploadChange}
          className="form-control input-file"
        />
        <button
          onClick={uploadImage}
          className="btn btn-primary upload-file"
          encType="multipart/form-data"
          type="button"
        >
          Upload
        </button>
      </div>
    </>
  );
};

export default AttachImage;
