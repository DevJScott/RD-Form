import React from "react";

function SubStep2SoftwareCost({ formData, onChange }) {
  const handleChange = (field) => (e) => {
    onChange(field, e.target.value);
  };

  const companyName = formData.companyName || "the company";

  return (
    <div>
      <h3>Software Costs</h3>
      <p>{companyName} can claim for software, cloud computing and data licence costs related to R&D.</p>

      <label>Software (£):</label>
      <input
        type="number"
        value={formData.softwareCost || ""}
        onChange={handleChange("softwareCost")}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Cloud Computing (£):</label>
      <input
        type="number"
        value={formData.cloudComputingCost || ""}
        onChange={handleChange("cloudComputingCost")}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Data Licences (£):</label>
      <input
        type="number"
        value={formData.dataLicenceCost || ""}
        onChange={handleChange("dataLicenceCost")}
        style={{ width: "100%", marginBottom: "20px" }}
      />

      <hr />

      <h4>% of Spend Relevant to R&D Project</h4>
      <label>
        Reducing the cost and increasing the logistical efficiency, and health & safety capabilities of pop-up soft play products (%):
      </label>
      <input
        type="number"
        step="0.01"
        value={formData.softwareRDPercent || ""}
        onChange={handleChange("softwareRDPercent")}
        style={{ width: "100%", marginBottom: "20px" }}
      />
    </div>
  );
}

export default SubStep2SoftwareCost;
