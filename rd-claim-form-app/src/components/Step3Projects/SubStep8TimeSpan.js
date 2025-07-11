import React from "react";

function SubStep8TimeSpan({ formData, onChange }) {
  const handleDateChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div>
      <h3>Time Span of Technical Problem Solving</h3>
      <p>
        HMRC needs to know when <strong>{formData.companyName || "PLAYCRAFT LTD"}</strong> was actively working to overcome technical challenges.
        The activity must fall within the claim period (01 October 2023 to 30 September 2024), but can begin before or finish after it.
      </p>

      <div style={{ marginTop: "20px" }}>
        <label>
          Start Month:{" "}
          <input
            type="month"
            value={formData.techWorkStart || "2023-10"}
            onChange={(e) => handleDateChange("techWorkStart", e.target.value)}
            min="2023-10"
            max="2024-09"
          />
        </label>
      </div>

      <div style={{ marginTop: "15px" }}>
        <label>
          End Month:{" "}
          <input
            type="month"
            value={formData.techWorkEnd || "2024-09"}
            onChange={(e) => handleDateChange("techWorkEnd", e.target.value)}
            min="2023-10"
            max="2024-09"
          />
        </label>
      </div>
    </div>
  );
}

export default SubStep8TimeSpan;
