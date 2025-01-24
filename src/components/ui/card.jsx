import React from "react";
import PropTypes from "prop-types";

// Card Container
export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Card Header
export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={`px-6 py-4 border-b border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Card Title
export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3
      className={`text-lg font-semibold text-gray-800 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Card Content
export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
