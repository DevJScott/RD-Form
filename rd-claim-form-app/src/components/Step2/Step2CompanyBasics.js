import React from "react";
import { useStepValidation } from "../hooks/useStepValidation"; // Ensure this exists

function Step2CompanyBasics({ formData, onChange, onNext, onBack }) {
  const { isValid, errors } = useStepValidation(2, formData); // Step 2 validation

  const totalStaff =
    Number(formData.directorCount || 0) + Number(formData.staffCount || 0);
  const shouldBlock = totalStaff > 3 && totalStaff < 81;
  const companyName = formData.companyName || "the company";

  const handleNext = () => {
    if (!isValid) {
      alert("Please correct all required fields before continuing.");
      return;
    }
    onNext();
  };

  return (
    <div className="step-wrapper">
      <h2>Step 2: The Basics</h2>
      <p>
        To determine which R&D tax relief scheme applies to your company, we need some essential background details.
      </p>

      {/* A. Company Identity */}
      <div className="section-card">
        <h3>Company Identity</h3>

        <label>Company Name:</label><br />
        <input
          value={formData.companyName}
          onChange={(e) => onChange("companyName", e.target.value)}
        />
        {errors.companyName && <p className="error">{errors.companyName}</p>}
        <br /><br />

        {formData.companyName && (
          <>
            <p>
              The registered company name has been entered as <strong>{formData.companyName}</strong>.
              If you'd like to use a shorter or informal name in the report, enter it below.
            </p>

            <input
              type="text"
              value={formData.informalCompanyName}
              onChange={(e) => onChange("informalCompanyName", e.target.value)}
              disabled={formData.useFullName}
              placeholder="e.g. Playcraft"
            /><br /><br />

            <label>
              <input
                type="checkbox"
                checked={formData.useFullName || false}
                onChange={(e) => onChange("useFullName", e.target.checked)}
              />{" "}
              No thanks, using our full name is fine
            </label><br /><br />
          </>
        )}

        <label>Contact Person Name:</label><br />
        <input
          value={formData.contactName}
          onChange={(e) => onChange("contactName", e.target.value)}
        />
        {errors.contactName && <p className="error">{errors.contactName}</p>}
        <br /><br />

        <label>Company Size:</label><br />
        <select
          value={formData.companySize}
          onChange={(e) => onChange("companySize", e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="Micro">Micro (under 10 staff)</option>
          <option value="Small">Small (under 50 staff)</option>
          <option value="Medium">Medium (under 250 staff)</option>
          <option value="Large">Large (250+ staff)</option>
        </select>
        {errors.companySize && <p className="error">{errors.companySize}</p>}
        <br /><br />

        <label>Industry Sector:</label><br />
        <input
          value={formData.industry}
          onChange={(e) => onChange("industry", e.target.value)}
        />
        {errors.industry && <p className="error">{errors.industry}</p>}
      </div>

      {/* B. Financial Snapshot */}
      <div className="section-card">
        <h3>Financial Snapshot (01 Oct 2023 – 30 Sept 2024)</h3>

        {["revenue", "balanceSheetAssets", "tradingExpenses", "capitalisedRAndD"].map((key) => (
          <div key={key}>
            <label>{{
              revenue: "Revenue (£):",
              balanceSheetAssets: "Total balance sheet assets at 30 Sept 2024 (£):",
              tradingExpenses: "Total trading and operating expenses (£):",
              capitalisedRAndD: "Total capitalised R&D expenditure (£):"
            }[key]}</label><br />
            <input
              type="number"
              value={formData[key]}
              onChange={(e) => onChange(key, e.target.value)}
            />
            {errors[key] && <p className="error">{errors[key]}</p>}
            <br /><br />
          </div>
        ))}

        <label>Profit or Loss before R&D claim (£):</label><br />
        <input
          type="text"
          value={formData.profitOrLoss}
          onChange={(e) => onChange("profitOrLoss", e.target.value)}
          placeholder="Enter - for loss"
        />
        {errors.profitOrLoss && <p className="error">{errors.profitOrLoss}</p>}
      </div>

      {/* C. People & Activity */}
      <div className="section-card">
        <h3>People & Activity</h3>

        <label>Number of directors at 30 Sept 2024:</label><br />
        <input
          type="number"
          min="0"
          value={formData.directorCount}
          onChange={(e) => onChange("directorCount", e.target.value)}
        />
        {errors.directorCount && <p className="error">{errors.directorCount}</p>}
        <br /><br />

        <label>Number of full-time staff (excluding directors):</label><br />
        <input
          type="number"
          min="0"
          value={formData.staffCount}
          onChange={(e) => onChange("staffCount", e.target.value)}
        />
        {errors.staffCount && <p className="error">{errors.staffCount}</p>}
        <br /><br />

        <label>External technical subcontractors or consultants used:</label><br />
        <input
          type="number"
          min="0"
          value={formData.subcontractorCount}
          onChange={(e) => onChange("subcontractorCount", e.target.value)}
        />
        {errors.subcontractorCount && <p className="error">{errors.subcontractorCount}</p>}
        <br /><br />

        {shouldBlock && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            Based on your answer, the company may not qualify (4–80 staff total). Please check eligibility before continuing.
          </p>
        )}
      </div>

      {/* D. Group & Connected Companies */}
      <div className="section-card">
        <h3>Company Structure</h3>

        <p>At 30 September 2024, was {companyName} part of a group?</p>
        <label>
          <input
            type="radio"
            name="partOfGroup"
            value="Yes"
            checked={formData.partOfGroup === "Yes"}
            onChange={(e) => onChange("partOfGroup", e.target.value)}
          />{" "}
          Yes
        </label><br />
        <label>
          <input
            type="radio"
            name="partOfGroup"
            value="No"
            checked={formData.partOfGroup === "No"}
            onChange={(e) => onChange("partOfGroup", e.target.value)}
          />{" "}
          No
        </label>
        {errors.partOfGroup && <p className="error">{errors.partOfGroup}</p>}
        <br /><br />

        <p>Did {companyName} have any connected companies during the claim period?</p>
        <label>
          <input
            type="radio"
            name="hasConnectedCompanies"
            value="Yes"
            checked={formData.hasConnectedCompanies === "Yes"}
            onChange={(e) => onChange("hasConnectedCompanies", e.target.value)}
          />{" "}
          Yes
        </label><br />
        <label>
          <input
            type="radio"
            name="hasConnectedCompanies"
            value="No"
            checked={formData.hasConnectedCompanies === "No"}
            onChange={(e) => onChange("hasConnectedCompanies", e.target.value)}
          />{" "}
          No
        </label>
        {errors.hasConnectedCompanies && <p className="error">{errors.hasConnectedCompanies}</p>}
      </div>

      {/* Navigation Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={onBack}>Back</button>{" "}
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default Step2CompanyBasics;
