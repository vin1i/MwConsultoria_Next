import React from "react";
import PropTypes from "prop-types";

export const Select = ({ children, className }) => {
  return <div className={`relative ${className}`}>{children}</div>;
};

export const SelectTrigger = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 flex justify-between items-center ${className}`}
    >
      {children}
    </button>
  );
};

export const SelectContent = ({ children, isOpen, className }) => {
  if (!isOpen) return null;
  return (
    <ul className={`absolute z-10 w-full bg-white border rounded-lg shadow-md mt-2 ${className}`}>
      {children}
    </ul>
  );
};

export const SelectItem = ({ value, children, onSelect, className }) => {
  return (
    <li
      onClick={() => onSelect(value)}
      className={`p-3 hover:bg-gray-100 cursor-pointer ${className}`}
    >
      {children}
    </li>
  );
};

export const SelectValue = ({ value, placeholder, className }) => {
  return <span className={`text-gray-700 ${className}`}>{value || placeholder}</span>;
};

Select.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SelectTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SelectContent.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

SelectItem.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SelectValue.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};