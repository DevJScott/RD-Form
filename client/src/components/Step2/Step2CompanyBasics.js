function Step2CompanyBasics({ formData, onChange, onNext, onBack }) {
  const totalStaff =
    Number(formData.directorCount || 0) + Number(formData.staffCount || 0);
  const shouldBlock = totalStaff > 3 && totalStaff < 81;
  const companyName = formData.companyName || "the company";

  const industryOptions = [
    "Agriculture, Forestry and Fishing",
    "Mining and Quarrying",
    "Manufacturing",
    "Electricity, gas, steam and air conditioning supply",
    "Water supply, sewerage, waste management and remediation activities",
    "Construction",
    "Wholesale and retail trade; repair of motor vehicles and motorcycles",
    "Transportation and storage",
    "Accommodation and food service activities",
    "Information and communication",
    "Financial and insurance activities",
    "Real estate activities",
    "Professional, scientific and technical activities",
    "Administrative and support service activities",
    "Public administration and defence; compulsory social security",
    "Education",
    "Human health and social work activities",
    "Arts, entertainment and recreation",
    "Other service activities",
    "Activities of extraterritorial organisations and bodies",
  ];

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
        <input
          value={formData.companyName}
          onChange={(e) => onChange("companyName", e.target.value)}
          required
        />

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
            <label>
              <input
                type="checkbox"
                checked={formData.useFullName || false}
                onChange={(e) => onChange("useFullName", e.target.checked)}
              />{" "}
              No thanks, using our full name is fine
            </label>
          </>
        )}

        <label>Contact Person Name:</label>
        <input
          value={formData.contactName}
          onChange={(e) => onChange("contactName", e.target.value)}
        />

        <label>Industry Sector:</label>
        <select
          value={formData.industry}
          onChange={(e) => onChange("industry", e.target.value)}
        >
          <option value="">-- Select Industry --</option>
          {industryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* B. Financial Snapshot */}
      <div className="section-card">
        <h3>
          Financial Snapshot (
          {formData.claimStartDate && formData.claimEndDate
            ? `${new Date(formData.claimStartDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })} – ${new Date(formData.claimEndDate).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                },
              )}`
            : "Claim Period"}
          )
        </h3>

        <label>Revenue (£):</label>
        <input
          type="number"
          value={formData.revenue}
          onChange={(e) => onChange("revenue", e.target.value)}
        />

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
        <input
          type="number"
          value={formData.balanceSheetAssets}
          onChange={(e) => onChange("balanceSheetAssets", e.target.value)}
        />

        <label>Total trading and operating expenses (£):</label>
        <input
          type="number"
          value={formData.tradingExpenses}
          onChange={(e) => onChange("tradingExpenses", e.target.value)}
        />

        <label>Total capitalised R&D expenditure (£):</label>
        <input
          type="number"
          value={formData.capitalisedRAndD}
          onChange={(e) => onChange("capitalisedRAndD", e.target.value)}
        />

        <label>Profit or Loss before R&D claim (£):</label>
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
        <input
          type="number"
          min="0"
          value={formData.directorCount}
          onChange={(e) => onChange("directorCount", e.target.value)}
        />

        <label>Number of full-time staff (excluding directors):</label>
        <input
          type="number"
          min="0"
          value={formData.staffCount}
          onChange={(e) => onChange("staffCount", e.target.value)}
        />

        <label>External technical subcontractors or consultants used:</label>
        <input
          type="number"
          min="0"
          value={formData.subcontractorCount}
          onChange={(e) => onChange("subcontractorCount", e.target.value)}
        />

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

        {formData.partOfGroup === "Yes" && (
          <div>
            <label>Total number of employees in the group:</label>
            <input
              type="number"
              min="0"
              value={formData.groupEmployeeCount || ""}
              onChange={(e) => onChange("groupEmployeeCount", e.target.value)}
            />

            <label>Total group revenue (£):</label>
            <input
              type="number"
              min="0"
              value={formData.groupRevenue || ""}
              onChange={(e) => onChange("groupRevenue", e.target.value)}
            />

            <label>Total group expenditure (£):</label>
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

        {formData.hasConnectedCompanies === "Yes" && (
          <>
            <label>Total number of employees in connected companies:</label>
            <input
              type="number"
              min="0"
              value={formData.connectedCompanyEmployeeCount || ""}
              onChange={(e) =>
                onChange("connectedCompanyEmployeeCount", e.target.value)
              }
            />
          </>
        )}
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={onBack}>Back</button>{" "}
        <button
          onClick={onNext}
          disabled={!formData.companyName || !formData.industry}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Step2CompanyBasics;
