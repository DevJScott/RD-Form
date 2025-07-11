import React from "react";

function Step5Descriptions({ formData, onChange, onBack, onNext }) {
  return (
    <div>
      <h2>Step 5: Project Descriptions</h2>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="technicalLead">Technical Lead</label><br />
        <input
          id="technicalLead"
          type="text"
          value={formData.technicalLead || ""}
          onChange={(e) => onChange("technicalLead", e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="scienceField">Field of Science or Technology</label><br />
        <input
          id="scienceField"
          type="text"
          value={formData.scienceField || ""}
          onChange={(e) => onChange("scienceField", e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="projectStart">Start Month</label><br />
        <input
          id="projectStart"
          type="date"
          value={formData.projectStart || ""}
          onChange={(e) => onChange("projectStart", e.target.value)}
          style={{ padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="projectEnd">End Month</label><br />
        <input
          id="projectEnd"
          type="date"
          value={formData.projectEnd || ""}
          onChange={(e) => onChange("projectEnd", e.target.value)}
          style={{ padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Industry Baseline (max 20,000 chars)</label><br />
        <textarea
          rows={8}
          maxLength={20000}
          value={formData.industrybaseline || ""}
          onChange={(e) => onChange("industrybaseline", e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Technological Advance (max 20,000 chars)</label><br />
        <textarea
          rows={8}
          maxLength={20000}
          value={formData.technologicaladvance || ""}
          onChange={(e) => onChange("technologicaladvance", e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Technological Uncertainties (max 20,000 chars)</label><br />
        <textarea
          rows={8}
          maxLength={20000}
          value={formData.technologicaluncertainties || ""}
          onChange={(e) => onChange("technologicaluncertainties", e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Technical Resolutions (max 20,000 chars)</label><br />
        <textarea
          rows={8}
          maxLength={20000}
          value={formData.technicalresolutions || ""}
          onChange={(e) => onChange("technicalresolutions", e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Supporting Image (optional)</label><br />
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          onChange={(e) => onChange("supportingImage", e.target.files[0])}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Image Caption (optional)</label><br />
        <input
          type="text"
          value={formData.imageCaption || ""}
          onChange={(e) => onChange("imageCaption", e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between" }}>
        <button onClick={onBack} style={{ padding: "10px 20px" }}>Back</button>
        <button onClick={onNext} style={{ padding: "10px 20px" }}>Next</button>
      </div>
      <div className="button-group">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>

    </div>
  );
}

export default Step5Descriptions;
