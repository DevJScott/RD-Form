import React, { useState } from "react";

function SubStep7ScienceArea({ formData, onChange }) {
  const maxSelections = 3;
  const selected = formData.scienceAreas || [];

  const [openGroups, setOpenGroups] = useState({});

  const toggleGroup = (key) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCheckboxChange = (area) => {
    if (selected.includes(area)) {
      onChange("scienceAreas", selected.filter((item) => item !== area));
    } else if (selected.length < maxSelections) {
      onChange("scienceAreas", [...selected, area]);
    }
  };

  const handleOtherChange = (group, value) => {
    const updated = { ...(formData.scienceAreasOther || {}) };
    updated[group] = value;
    onChange("scienceAreasOther", updated);
  };

  const renderGroup = (title, options, otherKey) => {
    const isOpen = openGroups[otherKey] || false;

    return (
      <div key={otherKey} style={{ marginBottom: "20px" }}>
        <h4
          style={{ cursor: "pointer", color: "#007bff" }}
          onClick={() => toggleGroup(otherKey)}
        >
          {title} {isOpen ? "▲" : "▼"}
        </h4>

        {isOpen && (
          <>
            {options.map((item) => (
              <label key={item} style={{ display: "block", marginBottom: "4px" }}>
                <input
                  type="checkbox"
                  checked={selected.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                  disabled={!selected.includes(item) && selected.length >= maxSelections}
                />{" "}
                {item}
              </label>
            ))}
            {otherKey && (
              <label style={{ display: "block", marginTop: "8px" }}>
                Other:{" "}
                <input
                  type="text"
                  value={(formData.scienceAreasOther?.[otherKey]) || ""}
                  onChange={(e) => handleOtherChange(otherKey, e.target.value)}
                  style={{ width: "100%" }}
                />
              </label>
            )}
          </>
        )}
      </div>
    );
  };

  const companyName = formData.companyName || "the company";

  return (
    <div>
      <h3>Area of Science or Technology</h3>
      <p>
        To qualify for tax relief, the difficulties must be related to a scientific or technological field.
        Please select up to 3 areas in which <strong>{companyName}</strong> worked.
      </p>

      {renderGroup("Mathematics & Computer Science", [
        "Applied mathematics", "Pure mathematics", "Statistics and probability",
        "Computer science", "Data science & analysis", "Software development",
        "Mobile application development", "Web application development",
        "Database-centric systems", "Data and information security", "Encryption",
        "Networks and communication"
      ], "mathsAndCS")}

      {renderGroup("Physical Sciences", [
        "Atomic, molecular and chemical physics", "Condensed matter physics",
        "Particles and fields physics", "Nuclear physics", "Fluids and plasma physics",
        "Optics", "Acoustics", "Astronomy and space science"
      ], "physicalScience")}

      {renderGroup("Biological Sciences", [
        "Cell biology", "Microbiology", "Genetics and heredity", "Biochemistry",
        "Zoology", "Plant sciences", "Marine biology", "Ecology"
      ], "biologicalScience")}

      {renderGroup("Engineering & Technology", [
        "Mechanical engineering", "Electrical and electronic engineering", "Robotics and automatic control",
        "Automation and control systems", "Civil engineering", "Telecommunications",
        "Materials engineering", "Medical engineering", "Chemical engineering"
      ], "engineering")}

      {renderGroup("Environmental Sciences", [
        "Geosciences", "Climatic research", "Meteorology", "Oceanography",
        "Water resources", "Hydrology", "Environmental biotechnology"
      ], "environment")}

      <p style={{ color: "#333", fontStyle: "italic" }}>
        Note: HMRC excludes fields like art, humanities, law, economics, and social sciences from R&D claims.
      </p>
    </div>
  );
}

export default SubStep7ScienceArea;
