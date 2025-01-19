import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

const CustomScrollbar = ({ children, style }) => {
  return (
    <Scrollbars
      autoHide
      autoHideTimeout={500}
      autoHideDuration={200}
      style={{
        ...style,
        overflow: "hidden",
      }}
      renderThumbVertical={(props) => (
        <div
          {...props}
          style={{
            backgroundColor: "#9c192b",
            width: "8px",
          }}
        />
      )}
      renderTrackVertical={(props) => (
        <div
          {...props}
          style={{
            right: "2px",
            bottom: "2px",
            top: "2px",
            backgroundColor: "transparent",
          }}
        />
      )}
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbar;
