import React from "react";

function Step5Descriptions({ formData, onChange, onBack, onNext }) {
  return (
    <div className="step-wrapper">
      <h2>Step 5: Project Descriptions</h2>

      <div className="section-card">
        <div className="form-group">
          <label htmlFor="technicalLead">Technical Lead</label>
          <input
            id="technicalLead"
            type="text"
            value={formData.technicalLead || ""}
            onChange={(e) => onChange("technicalLead", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="scienceField">Field of Science or Technology</label>
          <input
            id="scienceField"
            type="text"
            value={formData.scienceField || ""}
            onChange={(e) => onChange("scienceField", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="projectStart">Start Month</label>
          <input
            id="projectStart"
            type="date"
            value={formData.projectStart || ""}
            onChange={(e) => onChange("projectStart", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="projectEnd">End Month</label>
          <input
            id="projectEnd"
            type="date"
            value={formData.projectEnd || ""}
            onChange={(e) => onChange("projectEnd", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Industry Baseline (max 20,000 chars)</label>
          <textarea
            rows={8}
            maxLength={20000}
            value={formData.industrybaseline || ""}
            onChange={(e) => onChange("industrybaseline", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Technological Advance (max 20,000 chars)</label>
          <textarea
            rows={8}
            maxLength={20000}
            value={formData.technologicaladvance || ""}
            onChange={(e) => onChange("technologicaladvance", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Technological Uncertainties (max 20,000 chars)</label>
          <textarea
            rows={8}
            maxLength={20000}
            value={formData.technologicaluncertainties || ""}
            onChange={(e) => onChange("technologicaluncertainties", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Technical Resolutions (max 20,000 chars)</label>
          <textarea
            rows={8}
            maxLength={20000}
            value={formData.technicalresolutions || ""}
            onChange={(e) => onChange("technicalresolutions", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Supporting Image (optional)</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/gif"
            onChange={(e) => onChange("supportingImage", e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Image Caption (optional)</label>
          <input
            type="text"
            value={formData.imageCaption || ""}
            onChange={(e) => onChange("imageCaption", e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between" }}>
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
}

export default Step5Descriptions;
