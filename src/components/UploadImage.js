import React, { useState, useEffect } from "react";

const UploadImage = () => {
  const [image, setImage] = useState("");

  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const convertToImage = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const imageData = reader.result;
      localStorage.setItem("uploadedImage", imageData);
      setImage(imageData);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  const uploadImage = () => {
    fetch("http://localhost:5050/upload-image", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        base64: image,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error uploading image:", error));
  };

  return (
    <div className="flex items-center mr-4">
      <input accept="image/*" type="file" onChange={convertToImage} />
      {image === "" || image === null ? (
        ""
      ) : (
        <img className="w-[100px] h-100[px] " src={image} alt="Uploaded" />
      )}
    </div>
  );
};

export default UploadImage;
