import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { uploadFile } from "@/lib/upload";
import ImageWithButton from "../ImageWithButton";

type CustomPhotoUploaderProps = {
  name: string;
  label: string;
  initialValue?: string;
};

const CustomPhotoUploader = ({
  name,
  label,
  initialValue = '',
}: CustomPhotoUploaderProps) => {
  const [value, setValue] = useState(initialValue);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    await uploadFile(event, (link) => {
      setValue(link);
    });
  }
  const handleValue = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex items-center justify-center">
      {value ? (
        <ImageWithButton file={value} handleValue={handleValue} />
      ) : (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-60 border-2 btn-secondary border-dashed rounded-lg cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 gap-4">
              <FaUpload />
              <p>{label}</p>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        </div>
      )}
      <input type="hidden" name={name} value={value || ''} />
    </div>
  );
};

export default CustomPhotoUploader;

{
  /*   <div>
  <label className="w-full btn-secondary flex items-center justify-center gap-1 ">
  <FaUpload />
  <div>{label}</div>
  <input
  type="file"
  id={name}
  className="hidden"
  onChange={handleChange}
  value={""}
  />
  </label>
  <input type="hidden" name={name} value={value} />
  </div> */
}
