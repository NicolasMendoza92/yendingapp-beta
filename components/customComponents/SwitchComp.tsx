import React from "react";

interface SwitchProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

const SwitchComp: React.FC<SwitchProps> = ({ isChecked, onChange }) => {
  return (
    <div
      className={`${
        isChecked ? "bg-blue-500" : "bg-gray-300"
      } relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors`}
      onClick={() => onChange(!isChecked)}
    >
      <span
        className={`${
          isChecked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
      />
    </div>
  );
};

export default SwitchComp;