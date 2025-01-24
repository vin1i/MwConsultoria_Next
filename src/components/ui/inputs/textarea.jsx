import React from "react";
import PropTypes from "prop-types";

export const Textarea = ({ value, onChange, placeholder, className, ...props }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${className}`}
      {...props}
    />
  );
};

Textarea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};