import React, { useState } from "react";

interface FileUploadProps {
  label: string;
  name: string;
  accept: string;
  multiple?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | null) => void;
}

export default function FileUploadField({
  label,
  name,
  accept,
  onChange,
  multiple = false,
}: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
    onChange(e);
  };

  return (
    <div>
      <label className="block mb-1 text-gray-300">{label}</label>
      <div className="flex items-center bg-gray-800 border-gray-700 text-white p-2 rounded w-full">
        {/* The filename container truncates long names */}
        <span className="flex-1 truncate overflow-hidden whitespace-nowrap">
          {fileName || "No file selected"}
        </span>

        {/* Hide the actual input and trigger it via label */}
        <input
          id={name}
          type="file"
          name={name}
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        <label
          htmlFor={name}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white ml-2 whitespace-nowrap"
        >
          Browse…
        </label>
      </div>
    </div>
  );
}
