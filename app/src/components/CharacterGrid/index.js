import React from "react";

export const CharacterGrid = ({ children }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minWidth: "100%", minHeight: "40vh" }}
    >
      <div className="row" style={{
        columnGap: '10px',
      }}>{children}</div>
    </div>
  );
};
