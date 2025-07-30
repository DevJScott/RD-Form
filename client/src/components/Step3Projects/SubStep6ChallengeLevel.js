import React from "react";

function SubStep6ChallengeLevel({ formData, onChange }) {
  const handleSliderChange = (e) => {
    onChange("challengeLevelSlider", Number(e.target.value));
  };

  const companyName = formData.companyName || "the company";

  return (
    <div>
      <h3>Challenge Level</h3>
      <p>
        Some technical difficulties can be resolved very simply, using tried and tested techniques known to work.
        Others require far more persistence, creativity, and going beyond the usual ways of solving the issue.
        The more difficult the technical problems were, the stronger a claim for R&D tax relief.
      </p>
      <p>
        Use the slider below to choose the statement that best describes the significance of the technical difficulties
        <strong> {companyName} </strong> faced within the claim period.
      </p>

      <input
        type="range"
        min="0"
        max="3"
        step="1"
        value={formData.challengeLevelSlider || 0}
        onChange={handleSliderChange}
        style={{ width: "100%" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.9em",
          marginTop: "5px",
        }}
      >
        <span>Trivial</span>
        <span>Really tough</span>
      </div>

      <hr />

      <label>
        Optional Notes:
        <textarea
          value={formData.subStep6ChallengeLevel || ""}
          onChange={(e) => onChange("subStep6ChallengeLevel", e.target.value)}
          rows={4}
          style={{ width: "100%", marginTop: "5px" }}
        />
      </label>
    </div>
  );
}

export default SubStep6ChallengeLevel;
