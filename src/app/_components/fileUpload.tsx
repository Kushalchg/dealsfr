"use client";

import React, { useState, useEffect, useRef } from "react";

interface FileUploadFieldProps {
  label: string;
  name: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | null) => void; // null when removing
  preview?: string | null;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({ label, name, accept, onChange, preview }) => {
  const [fileName, setFileName] = useState("No file chosen");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (preview) {
      setFileName("Uploaded file");
    } else {
      setFileName("No file chosen");
      if (inputRef.current) {
        inputRef.current.value = ""; // clear file input when preview is cleared
      }
    }
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
      onChange(e);
    } else {
      setFileName("No file chosen");
      onChange(null);
    }
  };

  const handleRemoveFile = () => {
    setFileName("No file chosen");
    if (inputRef.current) {
      inputRef.current.value = ""; // clear the file input value
    }
    onChange(null);
  };

  return (
    <div>
      <label className="block text-gray-300 mb-1">{label}</label>
      <div className="flex items-center gap-3">
        <label className="px-4 py-2 bg-gray-700 text-white rounded-md shadow-sm cursor-pointer hover:bg-gray-600 transition">
          <span className="text-sm font-medium">Choose File</span>
          <input
            type="file"
            name={name}
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            ref={inputRef}
          />
        </label>
        <span className="text-sm text-gray-400 truncate">{fileName}</span>

        {preview && (
          <button
            type="button"
            onClick={handleRemoveFile}
            className="text-red-500 hover:text-red-700 text-sm font-semibold"
          >
            Remove
          </button>
        )}
      </div>
      {preview && (
        <img
          src={preview}
          alt={`${label} Preview`}
          className="mt-2 h-16 object-contain rounded"
        />
      )}
    </div>
  );
};

export default FileUploadField;
