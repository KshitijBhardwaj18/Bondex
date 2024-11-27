"use client";

import { useState } from "react";

export default function UploadFile() {
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const ipfsUrl = await uploadRequest.json();
      setUrl(ipfsUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  return (
    <main className="w-full mx-auto flex flex-col justify-center items-center">
        <h4 className="font-bold mb-2">Upload the certificate image for the bond  </h4>
      <input type="file" onChange={handleChange} className="ml-[10rem]" />
      {url && <img className="h-[80px] w-[80px]" src={url} alt="Image from Pinata" />}
      <button className="bg-black p-2 rounded-xl text-white mt-3" type="button" disabled={uploading} onClick={uploadFile}>
        {uploading ? "Uploading..." : "Upload file"}
      </button>
     
    </main>
  );
}
