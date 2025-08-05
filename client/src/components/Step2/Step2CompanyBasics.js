function Step2CompanyBasics({ formData, onChange, onNext, onBack }) {
  const totalStaff =
    Number(formData.directorCount || 0) + Number(formData.staffCount || 0);
  const shouldBlock = totalStaff > 3 && totalStaff < 81;

  const companyName = formData.companyName || "the company";

  return (
    <div className="step-wrapper">
      <h2>Step 2: The Basics</h2>

      <p>
        To determine which R&D tax relief scheme applies to your company, we
        need some essential background details.
      </p>

      {/* A. Company Identity */}
      <div className="section-card">
        <h3>Company Identity</h3>

        <label>Company Name:</label>
        <br />
        <input
          value={formData.companyName}
          onChange={(e) => onChange("companyName", e.target.value)}
          required
        />
        <br />
        <br />

        {formData.companyName && (
          <>
            <p>
              The registered company name has been entered as{" "}
              <strong>{formData.companyName}</strong>. If you'd like to use a
              shorter or informal name in the report, enter it below.
            </p>

            <input
              type="text"
              value={formData.informalCompanyName}
              onChange={(e) => onChange("informalCompanyName", e.target.value)}
              disabled={formData.useFullName}
              placeholder="e.g. ABC Ltd"
            />
            <br />
            <br />

            <label>
              <input
                type="checkbox"
                checked={formData.useFullName || false}
                onChange={(e) => onChange("useFullName", e.target.checked)}
              />{" "}
              No thanks, using our full name is fine
            </label>
            <br />
            <br />
          </>
        )}

        <label>Contact Person Name:</label>
        <br />
        <input
          value={formData.contactName}
          onChange={(e) => onChange("contactName", e.target.value)}
        />
        <br />
        <br />

        <label>Company Size:</label>
        <br />
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
        <br />
        <br />

        <label>Industry Sector:</label>
        <br />
        <input
          value={formData.industry}
          onChange={(e) => onChange("industry", e.target.value)}
        />
      </div>

      {/* B. Financial Snapshot */}
      <div className="section-card">
        <h3>
          Financial Snapshot (
          {formData.claimStartDate && formData.claimEndDate
            ? `${new Date(formData.claimStartDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} – ${new Date(formData.claimEndDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`
            : "Claim Period"}
          )
        </h3>

        <label>Revenue (£):</label>
        <br />
        <input
          type="number"
          value={formData.revenue}
          onChange={(e) => onChange("revenue", e.target.value)}
        />
        <br />
        <br />

        <label>
          Total balance sheet assets at{" "}
          {formData.claimEndDate
            ? new Date(formData.claimEndDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "claim end date"}{" "}
          (£):
        </label>
        <br />
        <input
          type="number"
          value={formData.balanceSheetAssets}
          onChange={(e) => onChange("balanceSheetAssets", e.target.value)}
        />
        <br />
        <br />

        <label>Total trading and operating expenses (£):</label>
        <br />
        <input
          type="number"
          value={formData.tradingExpenses}
          onChange={(e) => onChange("tradingExpenses", e.target.value)}
        />
        <br />
        <br />

        <label>Total capitalised R&D expenditure (£):</label>
        <br />
        <input
          type="number"
          value={formData.capitalisedRAndD}
          onChange={(e) => onChange("capitalisedRAndD", e.target.value)}
        />
        <br />
        <br />

        <label>Profit or Loss before R&D claim (£):</label>
        <br />
        <input
          type="text"
          value={formData.profitOrLoss}
          onChange={(e) => onChange("profitOrLoss", e.target.value)}
          placeholder="Enter - for loss"
        />
      </div>

      {/* C. People & Activity */}
      <div className="section-card">
        <h3>People & Activity</h3>

        <label>
          Number of directors at{" "}
          {formData.claimEndDate
            ? new Date(formData.claimEndDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "claim end date"}
          :
        </label>
        <br />
        <input
          type="number"
          min="0"
          value={formData.directorCount}
          onChange={(e) => onChange("directorCount", e.target.value)}
        />
        <br />
        <br />

        <label>Number of full-time staff (excluding directors):</label>
        <br />
        <input
          type="number"
          min="0"
          value={formData.staffCount}
          onChange={(e) => onChange("staffCount", e.target.value)}
        />
        <br />
        <br />

        <label>External technical subcontractors or consultants used:</label>
        <br />
        <input
          type="number"
          min="0"
          value={formData.subcontractorCount}
          onChange={(e) => onChange("subcontractorCount", e.target.value)}
        />
        <br />
        <br />

        {shouldBlock && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            Based on your answer, the company may not qualify (4–80 staff
            total). Please check eligibility before continuing.
          </p>
        )}
      </div>

      {/* D. Group & Connected Companies */}
      <div className="section-card">
        <h3>Company Structure</h3>

        <p>
          At{" "}
          {formData.claimEndDate
            ? new Date(formData.claimEndDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "the claim end date"}
          , was {companyName} part of a group?
        </p>
        <label>
          <input
            type="radio"
            name="partOfGroup"
            value="Yes"
            checked={formData.partOfGroup === "Yes"}
            onChange={(e) => onChange("partOfGroup", e.target.value)}
          />{" "}
          Yes
        </label>
        <br />
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
        <br />
        <br />

        {formData.partOfGroup === "Yes" && (
          <div style={{ marginBottom: "20px" }}>
            <label>Total number of employees in the group:</label>
            <br />
            <input
              type="number"
              min="0"
              value={formData.groupEmployeeCount || ""}
              onChange={(e) => onChange("groupEmployeeCount", e.target.value)}
            />
            <br />
            <br />

            <label>Total group revenue (£):</label>
            <br />
            <input
              type="number"
              min="0"
              value={formData.groupRevenue || ""}
              onChange={(e) => onChange("groupRevenue", e.target.value)}
            />
            <br />
            <br />

            <label>Total group expenditure (£):</label>
            <br />
            <input
              type="number"
              min="0"
              value={formData.groupExpenditure || ""}
              onChange={(e) => onChange("groupExpenditure", e.target.value)}
            />
          </div>
        )}

        <p>
          Did {companyName} have any connected companies during the claim
          period?
        </p>
        <label>
          <input
            type="radio"
            name="hasConnectedCompanies"
            value="Yes"
            checked={formData.hasConnectedCompanies === "Yes"}
            onChange={(e) => onChange("hasConnectedCompanies", e.target.value)}
          />{" "}
          Yes
        </label>
        <br />
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
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={onBack}>Back</button>{" "}
        <button
          onClick={onNext}
          disabled={!formData.companyName || !formData.companySize}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Step2CompanyBasics;
