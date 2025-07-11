import React from "react";

function ProjectDescriptions({ formData, onChange }) {
  const projects = formData.projectDescriptions || [];

  const updateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange("projectDescriptions", updated);
  };

  return (
    <div>
      <h3>Project Descriptions</h3>
      {projects.map((proj, i) => (
        <div key={i} style={{ marginBottom: "40px", borderBottom: "1px solid #ccc", paddingBottom: "20px" }}>
          <p><strong>Project Title:</strong> {proj.title}</p>
          <p><strong>% of total SME eligible expenditure:</strong> {proj.expenditurePercent}%</p>

          <label>
            Technical Lead:
            <input type="text" value={proj.technicalLead || ""} onChange={(e) => updateProject(i, "technicalLead", e.target.value)} style={{ width: "100%" }} />
          </label>

          <label>
            Field of Science or Technology:
            <input type="text" value={proj.field || ""} onChange={(e) => updateProject(i, "field", e.target.value)} style={{ width: "100%" }} />
          </label>

          <label>
            Start Month:
            <input type="date" value={proj.start || ""} onChange={(e) => updateProject(i, "start", e.target.value)} />
          </label>{" "}
          <label>
            End Month:
            <input type="date" value={proj.end || ""} onChange={(e) => updateProject(i, "end", e.target.value)} />
          </label>

          <label>
            Industry Baseline at the Start of the Project:
            <textarea
              value={proj.baseline || ""}
              onChange={(e) => updateProject(i, "baseline", e.target.value)}
              rows={5}
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Technological Advance Sought:
            <textarea
              value={proj.advance || ""}
              onChange={(e) => updateProject(i, "advance", e.target.value)}
              rows={5}
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Technological Uncertainties Encountered:
            <textarea
              value={proj.uncertainties || ""}
              onChange={(e) => updateProject(i, "uncertainties", e.target.value)}
              rows={5}
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Technical Resolutions Attempted:
            <textarea
              value={proj.resolutions || ""}
              onChange={(e) => updateProject(i, "resolutions", e.target.value)}
              rows={5}
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Supporting Image (optional):
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={(e) => updateProject(i, "image", e.target.files[0])}
            />
          </label>

          <label>
            Image Caption (optional):
            <input
              type="text"
              value={proj.imageCaption || ""}
              onChange={(e) => updateProject(i, "imageCaption", e.target.value)}
              style={{ width: "100%" }}
            />
          </label>
        </div>
      ))}
    </div>
  );
}

export default ProjectDescriptions;
