import React from "react";

function SubStep6SubcontractorCost({ formData, onChange }) {
  const { usedSubcontractors = "", subcontractorCosts = {}, projectSubcontractorSplit = {} } = formData;

  const categories = [
    "Limited companies",
    "Individuals (i.e. Sole Traders)",
    "Partnerships",
    "Charities",
    "Universities",
    "Other higher education bodies",
    "Scientific research organisations",
    "Health Service bodies",
  ];

  const handleRadioChange = (e) => {
    const value = e.target.value;
    onChange("usedSubcontractors", value);
    if (value === "no") {
      onChange("subcontractorCosts", {});
      onChange("projectSubcontractorSplit", {});
    }
  };

  const handleCostChange = (category, type, value) => {
    const updated = { ...subcontractorCosts };
    if (!updated[category]) updated[category] = {};
    updated[category][type] = value;
    onChange("subcontractorCosts", updated);
  };

  const handleProjectSplitChange = (value) => {
    onChange("projectSubcontractorSplit", {
      ...projectSubcontractorSplit,
      "Reducing the cost and increasing the logistical efficiency, and health & safety capabilities of pop-up soft play products": value,
    });
  };

  return (
    <div>
      <h3>Subcontractor Cost</h3>
      <p>
        PLAYCRAFT LTD can claim for subcontractors who helped it overcome technical difficulties.
        Do not include marketing, sales, or admin contractors. Separate costs by connected vs. unconnected.
      </p>

      <div style={{ marginBottom: "20px" }}>
        <label>
          <input
            type="radio"
            name="usedSubcontractors"
            value="no"
            checked={usedSubcontractors === "no"}
            onChange={handleRadioChange}
          />{" "}
          No, it didn’t use any subcontractors
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="usedSubcontractors"
            value="yes"
            checked={usedSubcontractors === "yes"}
            onChange={handleRadioChange}
          />{" "}
          Yes, it did use subcontractors who helped it overcome technical difficulties
        </label>
      </div>

      {usedSubcontractors === "yes" && (
        <>
          <h4>Enter Annual Expenditure (by Subcontractor Type)</h4>
          {categories.map((cat) => (
            <div key={cat} style={{ marginBottom: "15px" }}>
              <strong>{cat}</strong>
              <br />
              <label>
                Connected (£):{" "}
                <input
                  type="number"
                  min="0"
                  value={subcontractorCosts[cat]?.connected || ""}
                  onChange={(e) => handleCostChange(cat, "connected", e.target.value)}
                  style={{ width: "120px", marginRight: "20px" }}
                />
              </label>
              <label>
                Unconnected (£):{" "}
                <input
                  type="number"
                  min="0"
                  value={subcontractorCosts[cat]?.unconnected || ""}
                  onChange={(e) => handleCostChange(cat, "unconnected", e.target.value)}
                  style={{ width: "120px" }}
                />
              </label>
            </div>
          ))}

          <hr style={{ margin: "30px 0" }} />

          <h4>Project Apportionment</h4>
          <p>
            Estimate what percentage of PLAYCRAFT LTD’s subcontractor cost was spent on the project below.
            Do not apply the 65% rule — it will be applied automatically.
          </p>
          <label>
            <strong>Reducing the cost and increasing the logistical efficiency, and health & safety capabilities of pop-up soft play products</strong><br />
            % of subcontractor cost:{" "}
            <input
              type="number"
              min="0"
              max="100"
              value={
                projectSubcontractorSplit[
                  "Reducing the cost and increasing the logistical efficiency, and health & safety capabilities of pop-up soft play products"
                ] || ""
              }
              onChange={(e) => handleProjectSplitChange(e.target.value)}
              style={{ width: "80px", marginTop: "5px" }}
            />{" "}
            %
          </label>
        </>
      )}
    </div>
  );
}

export default SubStep6SubcontractorCost;
