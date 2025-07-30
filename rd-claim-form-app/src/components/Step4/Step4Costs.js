import React, { useState } from "react";
import SubStep1StaffCost from "./SubStep1StaffCost";
import SubStep2SoftwareCost from "./SubStep2SoftwareCost";
import SubStep3ClinicalTrialsCost from "./SubStep3ClinicalTrialsCost";
import SubStep4ConsumablesCost from "./SubStep4ConsumablesCost";
import SubStep5EPWCost from "./SubStep5EPWCost";
import SubStep6SubcontractorCost from "./SubStep6SubcontractorCost";

function Step4Costs({ formData, onChange, onNext, onBack }) {
  const [open, setOpen] = useState({});

  const toggle = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    { key: "staff", title: "Staff Costs", component: <SubStep1StaffCost formData={formData} onChange={onChange} /> },
    { key: "software", title: "Software Costs", component: <SubStep2SoftwareCost formData={formData} onChange={onChange} /> },
    { key: "trials", title: "Clinical Trials Costs", component: <SubStep3ClinicalTrialsCost formData={formData} onChange={onChange} /> },
    { key: "consumables", title: "Consumables Costs", component: <SubStep4ConsumablesCost formData={formData} onChange={onChange} /> },
    { key: "epw", title: "Externally Provided Workers (EPWs)", component: <SubStep5EPWCost formData={formData} onChange={onChange} /> },
    { key: "subcontractors", title: "Subcontractor Costs", component: <SubStep6SubcontractorCost formData={formData} onChange={onChange} /> },
  ];

  return (
    <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", marginTop: "20px" }}>
      <h2 style={{ marginTop: 0 }}>Step 4: Costs</h2>
      <p>Section 1 of 6</p>

      {sections.map(({ key, title, component }) => (
        <div key={key} style={{ marginBottom: "25px" }}>
          <div
            onClick={() => toggle(key)}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.1em",
              color: "#333",
              paddingBottom: "6px",
              borderBottom: "1px solid #ccc",
            }}
          >
            {title} {open[key] ? "▲" : "▼"}
          </div>
          {open[key] && (
            <div style={{ paddingTop: "10px", paddingLeft: "10px" }}>
              {component}
            </div>
          )}
        </div>
      ))}

      <div style={{ marginTop: "30px" }}>
        <button onClick={onBack}>← Back to Step 3</button>{" "}
        <button onClick={onNext}>Continue to Step 5 →</button>
      </div>
    </div>
  );
}

export default Step4Costs;
