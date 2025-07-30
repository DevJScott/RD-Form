import React, { useEffect } from "react";

function SubStep3ClinicalTrialsCost({ formData, onChange }) {
  const {
    noClinicalTrials,
    phase1Cost = "",
    phase2Cost = "",
    phase3Cost = "",
    phase4Cost = ""
  } = formData;

  const companyName = formData.companyName || "the company";

  useEffect(() => {
    if (noClinicalTrials) {
      onChange("phase1Cost", "");
      onChange("phase2Cost", "");
      onChange("phase3Cost", "");
      onChange("phase4Cost", "");
    }
  }, [noClinicalTrials, onChange]);

  const handleChange = (field) => (e) => {
    onChange(field, e.target.value);
  };

  const renderInput = (label, value, field) => (
    <div style={{ marginBottom: "10px" }}>
      <label>{label} (£):</label>
      <input
        type="number"
        value={value}
        onChange={handleChange(field)}
        style={{ width: "100%" }}
        required={!noClinicalTrials}
        disabled={noClinicalTrials}
        min="0"
      />
    </div>
  );

  return (
    <div>
      <h3>Clinical Trials Cost</h3>
      <p>
        {companyName} can include payments made to volunteers for clinical trial participation during the claim period.
      </p>

      <label>
        <input
          type="checkbox"
          checked={noClinicalTrials || false}
          onChange={(e) => onChange("noClinicalTrials", e.target.checked)}
        />{" "}
        No, the company didn’t pay people to participate in clinical trials
      </label>

      {!noClinicalTrials && (
        <>
          <hr />
          <h4>
            Project: Reducing the cost and increasing the logistical efficiency, and health & safety capabilities of pop-up soft play products
          </h4>

          {renderInput("Phase 1", phase1Cost, "phase1Cost")}
          {renderInput("Phase 2", phase2Cost, "phase2Cost")}
          {renderInput("Phase 3", phase3Cost, "phase3Cost")}
          {renderInput("Phase 4", phase4Cost, "phase4Cost")}
        </>
      )}
    </div>
  );
}

export default SubStep3ClinicalTrialsCost;
