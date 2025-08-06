function Step1Qualification({ formData, onChange, onNext }) {
  const handleRadioChange = (field, value) => {
    onChange(field, value);
  };

  const handleCheckboxChange = (e) => {
    onChange("understandsGoingConcernWarning", e.target.checked);
  };

  const handleInputChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  const allAnswered =
    [
      "isLimitedCompany",
      "paysCorpTax",
      "inAdministration",
      "inLiquidation",
      "accountsPreparedOnGoingConcern",
      "claimStartDate",
      "claimEndDate",
      "hasClaimedBefore",
      "hasNotifiedHMRC",
    ].every((key) => formData[key] !== "") &&
    formData.understandsGoingConcernWarning;

  // ❌ Disqualification conditions
  const isDisqualified =
    formData.isLimitedCompany === "No" ||
    formData.paysCorpTax === "No" ||
    formData.inAdministration === "Yes" ||
    formData.inLiquidation === "Yes" ||
    formData.accountsPreparedOnGoingConcern === "No";

  return (
    <div className="step-wrapper">
      <h2>Step 1: Eligibility & Qualification</h2>

      <div className="section-card">
        <h3>Legal Status</h3>

        {/* Limited Company */}
        <div className="form-group">
          <label>Is the claimant a Limited Company?</label>
          <div className="radio-group">
            <input
              type="radio"
              id="isLimitedCompanyYes"
              name="isLimitedCompany"
              value="Yes"
              checked={formData.isLimitedCompany === "Yes"}
              onChange={(e) =>
                handleRadioChange("isLimitedCompany", e.target.value)
              }
            />
            <label htmlFor="isLimitedCompanyYes">Yes</label>
          </div>
          <div className="radio-group">
            <input
              type="radio"
              id="isLimitedCompanyNo"
              name="isLimitedCompany"
              value="No"
              checked={formData.isLimitedCompany === "No"}
              onChange={(e) =>
                handleRadioChange("isLimitedCompany", e.target.value)
              }
            />
            <label htmlFor="isLimitedCompanyNo">No</label>
          </div>
          {formData.isLimitedCompany === "No" && (
            <p className="field-warning">
              You must be a Limited Company to be eligible for R&D Tax Relief.
            </p>
          )}
        </div>

        {/* Corporation Tax */}
        <div className="form-group">
          <label>Is the company subject to UK Corporation Tax?</label>
          <div className="radio-group">
            <input
              type="radio"
              id="paysCorpTaxYes"
              name="paysCorpTax"
              value="Yes"
              checked={formData.paysCorpTax === "Yes"}
              onChange={(e) => handleRadioChange("paysCorpTax", e.target.value)}
            />
            <label htmlFor="paysCorpTaxYes">Yes</label>
          </div>
          <div className="radio-group">
            <input
              type="radio"
              id="paysCorpTaxNo"
              name="paysCorpTax"
              value="No"
              checked={formData.paysCorpTax === "No"}
              onChange={(e) => handleRadioChange("paysCorpTax", e.target.value)}
            />
            <label htmlFor="paysCorpTaxNo">No</label>
          </div>
          {formData.paysCorpTax === "No" && (
            <p className="field-warning">
              You must be subject to UK Corporation Tax to be eligible for R&D
              Tax Relief.
            </p>
          )}
        </div>

        {/* Other Yes/No questions */}
        {[
          {
            label: "Is the company in administration?",
            name: "inAdministration",
            warning:
              "You cannot be in administration to be eligible for R&D Tax Relief.",
          },
          {
            label: "Is the company in liquidation?",
            name: "inLiquidation",
            warning:
              "You cannot be in liquidation to be eligible for R&D Tax Relief.",
          },
          {
            label: "Are the accounts prepared on a going concern basis?",
            name: "accountsPreparedOnGoingConcern",
            warning: "Accounts must be prepared on a Going Concern basis.",
          },
          {
            label: "Has the company claimed R&D tax relief before?",
            name: "hasClaimedBefore",
          },
          {
            label: "Has the company notified HMRC about an R&D claim?",
            name: "hasNotifiedHMRC",
          },
        ].map(({ label, name, warning }) => (
          <div className="form-group" key={name}>
            <label>{label}</label>
            <div className="radio-group">
              <input
                type="radio"
                id={`${name}Yes`}
                name={name}
                value="Yes"
                checked={formData[name] === "Yes"}
                onChange={(e) => handleRadioChange(name, e.target.value)}
              />
              <label htmlFor={`${name}Yes`}>Yes</label>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                id={`${name}No`}
                name={name}
                value="No"
                checked={formData[name] === "No"}
                onChange={(e) => handleRadioChange(name, e.target.value)}
              />
              <label htmlFor={`${name}No`}>No</label>
            </div>
            {warning &&
              formData[name] ===
                (name === "accountsPreparedOnGoingConcern" ? "No" : "Yes") && (
                <p className="field-warning">{warning}</p>
              )}
          </div>
        ))}

        {/* Accounting Period */}
        <div className="form-group">
          <label>Accounting Period Start Date</label>
          <input
            type="date"
            name="claimStartDate"
            value={formData.claimStartDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Accounting Period End Date</label>
          <input
            type="date"
            name="claimEndDate"
            value={formData.claimEndDate}
            onChange={handleInputChange}
          />
        </div>

        {/* Checkbox */}
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={formData.understandsGoingConcernWarning}
              onChange={handleCheckboxChange}
            />
            I understand the going concern condition
          </label>
        </div>

        {/* ❌ Disqualification Banner */}
        {isDisqualified && (
          <div className="disqualify-banner">
            🚫 Based on your answers, your company is not eligible for R&D Tax
            Relief.
          </div>
        )}
      </div>

      <button onClick={onNext} disabled={!allAnswered || isDisqualified}>
        Next
      </button>
    </div>
  );
}

export default Step1Qualification;
