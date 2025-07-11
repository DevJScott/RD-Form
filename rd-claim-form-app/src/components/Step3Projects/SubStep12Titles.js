import React from "react";

function SubStep12Titles({ formData, onChange }) {
  const projectCount = parseInt(formData.projectCount) || 1;
  const titles = formData.projectTitles || [];

  const updateTitle = (index, field, value) => {
    const updated = [...titles];
    updated[index] = { ...updated[index], [field]: value };
    onChange("projectTitles", updated);
  };

  const handleProjectCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    onChange("projectCount", count);

    let updated = [...titles];
    if (count > updated.length) {
      for (let i = updated.length; i < count; i++) {
        updated.push({ title: "", grantFunded: false, subcontractedByLarge: false });
      }
    } else {
      updated = updated.slice(0, count);
    }
    onChange("projectTitles", updated);
  };

  return (
    <div>
      <h3>Project Titles</h3>
      <p>
        HMRC require a certain number of PLAYCRAFT LTD’s projects to be described in detail. The number of projects described depends on how many projects are being included in the claim, and what proportion of the overall costs they represent.
      </p>
      <p><strong>HMRC’s rules are as follows:</strong></p>
      <ul>
        <li>If 1–3 projects are claimed for, all must be described.</li>
        <li>If 4–10, describe at least 3 representing at least 50% of costs.</li>
        <li>If 10+, describe at least 3, representing either 50% of costs or 10 projects (whichever is lower).</li>
      </ul>

      <label style={{ display: "block", marginTop: "20px" }}>
        <strong>How many projects are included in the claim?</strong>
        <input
          type="number"
          min="1"
          value={formData.projectCount || ""}
          onChange={handleProjectCountChange}
          style={{ width: "100%", marginTop: "5px" }}
        />
      </label>

      <div style={{ marginTop: "30px" }}>
        {titles.slice(0, projectCount).map((project, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "15px" }}>
            <h4>Project {index + 1}</h4>
            <label>
              <strong>Project Title:</strong>
              <input
                type="text"
                value={project.title}
                onChange={(e) => updateTitle(index, "title", e.target.value)}
                style={{ width: "100%", marginTop: "5px" }}
              />
            </label>
            <br />
            <label style={{ display: "block", marginTop: "10px" }}>
              <input
                type="checkbox"
                checked={project.grantFunded || false}
                onChange={(e) => updateTitle(index, "grantFunded", e.target.checked)}
              />{" "}
              This project received grant funding
            </label>
            <label style={{ display: "block", marginTop: "5px" }}>
              <input
                type="checkbox"
                checked={project.subcontractedByLarge || false}
                onChange={(e) => updateTitle(index, "subcontractedByLarge", e.target.checked)}
              />{" "}
              This project was subcontracted to PLAYCRAFT LTD by a large company
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubStep12Titles;
