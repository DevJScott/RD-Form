function Step2CompanySME({ formData, onChange, onNext, onBack }) {
  const companyName = formData.companyName || "the company";

  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const allAnswered = [
    "partOfGroup",
    "hasConnectedCompanies",
    "otherShareholders25Plus",
    "ownsOtherCompanies25Plus",
  ].every((key) => formData[key]);

  return (
    <div>
      <h2>Step 2: SME Status Check</h2>
      <p>
        To determine SME status for R&D tax relief, we need to understand your company’s
        ownership and connected companies at 30 September 2024.
      </p>

      {/* Group membership */}
      <p>Was {companyName} part of a group?</p>
      <label>
        <input
          type="radio"
          name="partOfGroup"
          value="Yes"
          checked={formData.partOfGroup === "Yes"}
          onChange={() => handleChange("partOfGroup", "Yes")}
        />{" "}
        Yes
      </label><br />
      <label>
        <input
          type="radio"
          name="partOfGroup"
          value="No"
          checked={formData.partOfGroup === "No"}
          onChange={() => handleChange("partOfGroup", "No")}
        />{" "}
        No
      </label><br /><br />

      {/* Connected companies */}
      <p>Did {companyName} have any connected companies during the claim period?</p>
      <label>
        <input
          type="radio"
          name="hasConnectedCompanies"
          value="Yes"
          checked={formData.hasConnectedCompanies === "Yes"}
          onChange={() => handleChange("hasConnectedCompanies", "Yes")}
        />{" "}
        Yes
      </label><br />
      <label>
        <input
          type="radio"
          name="hasConnectedCompanies"
          value="No"
          checked={formData.hasConnectedCompanies === "No"}
          onChange={() => handleChange("hasConnectedCompanies", "No")}
        />{" "}
        No
      </label><br /><br />

      {/* Shareholders */}
      <p>
        Excluding directors, did any other entity or individual own 25% or more of {companyName}?
      </p>
      <label>
        <input
          type="radio"
          name="otherShareholders25Plus"
          value="Yes, at least one other entity or individual owned 25% or more"
          checked={
            formData.otherShareholders25Plus ===
            "Yes, at least one other entity or individual owned 25% or more"
          }
          onChange={(e) => handleChange("otherShareholders25Plus", e.target.value)}
        />{" "}
        Yes, at least one other entity or individual owned 25% or more
      </label><br />
      <label>
        <input
          type="radio"
          name="otherShareholders25Plus"
          value="No, they owned less than 25%"
          checked={formData.otherShareholders25Plus === "No, they owned less than 25%"}
          onChange={(e) => handleChange("otherShareholders25Plus", e.target.value)}
        />{" "}
        No, they owned less than 25%
      </label><br />
      <label>
        <input
          type="radio"
          name="otherShareholders25Plus"
          value="No, there were no other shareholders"
          checked={formData.otherShareholders25Plus === "No, there were no other shareholders"}
          onChange={(e) => handleChange("otherShareholders25Plus", e.target.value)}
        />{" "}
        No, there were no other shareholders
      </label><br /><br />

      {/* Ownership of other companies */}
      <p>
        Did {companyName} own 25% or more of the shares in any other company at 30 September 2024?
      </p>
      <label>
        <input
          type="radio"
          name="ownsOtherCompanies25Plus"
          value="Yes, it owned 25% or more of another company"
          checked={
            formData.ownsOtherCompanies25Plus ===
            "Yes, it owned 25% or more of another company"
          }
          onChange={(e) => handleChange("ownsOtherCompanies25Plus", e.target.value)}
        />{" "}
        Yes, it owned 25% or more of another company
      </label><br />
      <label>
        <input
          type="radio"
          name="ownsOtherCompanies25Plus"
          value="No, it owned less than 25%"
          checked={formData.ownsOtherCompanies25Plus === "No, it owned less than 25%"}
          onChange={(e) => handleChange("ownsOtherCompanies25Plus", e.target.value)}
        />{" "}
        No, it owned less than 25%
      </label><br />
      <label>
        <input
          type="radio"
          name="ownsOtherCompanies25Plus"
          value="No, it didn't own shares in any other company"
          checked={
            formData.ownsOtherCompanies25Plus ===
            "No, it didn't own shares in any other company"
          }
          onChange={(e) => handleChange("ownsOtherCompanies25Plus", e.target.value)}
        />{" "}
        No, it didn't own shares in any other company
      </label><br /><br />

      {/* Navigation */}
      <button onClick={onBack}>Back</button>{" "}
      <button onClick={onNext} disabled={!allAnswered}>Next</button>
    </div>
  );
}

export default Step2CompanySME;
