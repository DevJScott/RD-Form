import React from "react";
import { useStepValidation } from "../hooks/useStepValidation"; // Make sure this hook exists

function Step1Qualification({ formData, onChange, onNext }) {
  const { isValid, errors } = useStepValidation(1, formData); // Step 1 validation

  const handleRadioChange = (field, value) => {
    onChange(field, value);
  };

  const handleCheckboxChange = (e) => {
    onChange("understandsGoingConcernWarning", e.target.checked);
  };

  const handleInputChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  const handleNextClick = () => {
    if (!isValid) {
      alert("Please correct the highlighted errors before continuing.");
      return;
    }
    onNext();
  };

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
              onChange={(e) => handleRadioChange("isLimitedCompany", e.target.value)}
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
              onChange={(e) => handleRadioChange("isLimitedCompany", e.target.value)}
            />
            <label htmlFor="isLimitedCompanyNo">No</label>
          </div>
          {errors.isLimitedCompany && <p className="error">{errors.isLimitedCompany}</p>}
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
          {errors.paysCorpTax && <p className="error">{errors.paysCorpTax}</p>}
        </div>

        {/* Repeating Yes/No Questions */}
        {[
          { label: "Is the company in administration?", name: "inAdministration" },
          { label: "Is the company in liquidation?", name: "inLiquidation" },
          { label: "Are the accounts prepared on a going concern basis?", name: "accountsPreparedOnGoingConcern" },
          { label: "Has the company claimed R&D tax relief before?", name: "hasClaimedBefore" },
          { label: "Has the company notified HMRC about an R&D claim?", name: "hasNotifiedHMRC" },
        ].map(({ label, name }) => (
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
            {errors[name] && <p className="error">{errors[name]}</p>}
          </div>
        ))}

        {/* Claim Dates */}
        <div className="form-group">
          <label>Claim Start Date</label>
          <input
            type="date"
            name="claimStartDate"
            value={formData.claimStartDate}
            onChange={handleInputChange}
          />
          {errors.claimStartDate && <p className="error">{errors.claimStartDate}</p>}
        </div>

        <div className="form-group">
          <label>Claim End Date</label>
          <input
            type="date"
            name="claimEndDate"
            value={formData.claimEndDate}
            onChange={handleInputChange}
          />
          {errors.claimEndDate && <p className="error">{errors.claimEndDate}</p>}
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
          {errors.understandsGoingConcernWarning && (
            <p className="error">{errors.understandsGoingConcernWarning}</p>
          )}
        </div>
      </div>

      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}

export default Step1Qualification;
