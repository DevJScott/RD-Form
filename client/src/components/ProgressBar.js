// src/components/ProgressBar.js
import React from "react";

function ProgressBar({ currentStep, totalSteps }) {
  const percent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          height: "10px",
          background: "#e0e0e0",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: "#4caf50",
            transition: "width 0.3s ease-in-out",
          }}
        ></div>
      </div>
      <p style={{ fontSize: "14px", textAlign: "right", marginTop: "5px" }}>
        {percent}% complete
      </p>
    </div>
  );
}

export default ProgressBar;
