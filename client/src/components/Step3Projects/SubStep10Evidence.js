import React from "react";

function SubStep10Evidence({ formData, onChange }) {
  const evidenceOptions = [
    "Emails relevant to the work",
    "Development diaries",
    "Sprint plans",
    "Time sheets",
    "Prototypes, whether physical or software",
    "Project plans",
    "Files related to the development work",
    "Invoices related to the development work",
    "Bank statements",
    "Contracts related to the development work",
    "Documents summarising results or effort",
    "Nothing is available to evidence the work"
  ];

  const selected = formData.evidenceTypes || [];
  const other = formData.otherEvidence || "";

  const toggleOption = (item) => {
    let updated;

    if (selected.includes(item)) {
      updated = selected.filter((val) => val !== item);
    } else {
      if (item === "Nothing is available to evidence the work") {
        updated = [item];
      } else {
        updated = selected
          .filter((val) => val !== "Nothing is available to evidence the work")
          .concat(item);
      }
    }

    onChange("evidenceTypes", updated);
  };

  const handleOtherChange = (e) => {
    onChange("otherEvidence", e.target.value);
  };

  return (
    <div>
      <h3>Evidence of R&D Work</h3>
      <p>
        Although there is no formal requirement to keep records on a company's R&D activities,
        it is helpful to demonstrate to HMRC that the company has evidence to support its tax claim.
      </p>

      {evidenceOptions.map((item) => (
        <label key={item} style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="checkbox"
            checked={selected.includes(item)}
            onChange={() => toggleOption(item)}
          />{" "}
          {item}
        </label>
      ))}

      <label style={{ display: "block", marginTop: "20px" }}>
        <strong>Other:</strong>
        <input
          type="text"
          value={other}
          onChange={handleOtherChange}
          placeholder="Enter other evidence not mentioned above"
          style={{ width: "100%", marginTop: "5px" }}
        />
      </label>
    </div>
  );
}

export default SubStep10Evidence;
