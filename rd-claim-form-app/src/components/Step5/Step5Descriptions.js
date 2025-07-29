import React from "react";

function ProjectDescriptions({ formData, onChange }) {
  const projects = formData.projectDescriptions || [];

  const updateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange("projectDescriptions", updated);
  };

  return (
    <div className="step-wrapper">
      <h2>Project Descriptions</h2>

      {projects.map((proj, i) => (
        <div key={i} className="section-card">
          <p><strong>Project Title:</strong> {proj.title}</p>
          <p><strong>% of total SME eligible expenditure:</strong> {proj.expenditurePercent}%</p>

          <div className="form-group">
            <label>Technical Lead</label>
            <input
              type="text"
              value={proj.technicalLead || ""}
              onChange={(e) => updateProject(i, "technicalLead", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Field of Science or Technology</label>
            <input
              type="text"
              value={proj.field || ""}
              onChange={(e) => updateProject(i, "field", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Start Month</label>
            <input
              type="date"
              value={proj.start || ""}
              onChange={(e) => updateProject(i, "start", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>End Month</label>
            <input
              type="date"
              value={proj.end || ""}
              onChange={(e) => updateProject(i, "end", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Industry Baseline at the Start of the Project</label>
            <textarea
              value={proj.baseline || ""}
              onChange={(e) => updateProject(i, "baseline", e.target.value)}
              rows={5}
            />
          </div>

          <div className="form-group">
            <label>Technological Advance Sought</label>
            <textarea
              value={proj.advance || ""}
              onChange={(e) => updateProject(i, "advance", e.target.value)}
              rows={5}
            />
          </div>

          <div className="form-group">
            <label>Technological Uncertainties Encountered</label>
            <textarea
              value={proj.uncertainties || ""}
              onChange={(e) => updateProject(i, "uncertainties", e.target.value)}
              rows={5}
            />
          </div>

          <div className="form-group">
            <label>Technical Resolutions Attempted</label>
            <textarea
              value={proj.resolutions || ""}
              onChange={(e) => updateProject(i, "resolutions", e.target.value)}
              rows={5}
            />
          </div>

          <div className="form-group">
            <label>Supporting Image (optional)</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={(e) => updateProject(i, "image", e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label>Image Caption (optional)</label>
            <input
              type="text"
              value={proj.imageCaption || ""}
              onChange={(e) => updateProject(i, "imageCaption", e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectDescriptions;
