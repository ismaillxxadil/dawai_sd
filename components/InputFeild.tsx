"use client";

import React from "react";

export type SearchInputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "email" | "password";
  name?: string;
  className?: string;
};

export default function InputFeilds({
  label,
  placeholder,
  value,
  onChange = () => {},
  type = "text",
  name,
  className = "",
}: SearchInputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
