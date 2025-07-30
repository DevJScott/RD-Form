import React from "react";

function SubStep5EPWCost({ formData, onChange }) {
  const {
    usedEPWs = "",
    epwCost = "",
    connectedEPWCost = ""
  } = formData;

  const companyName = formData.companyName || "the company";

  const handleRadioChange = (e) => {
    const value = e.target.value;
    onChange("usedEPWs", value);
    if (value === "no") {
      onChange("epwCost", "");
      onChange("connectedEPWCost", "");
    }
  };

  return (
    <div>
      <h3>EPW (Externally Provided Workers) Cost</h3>

      <p>
        It’s not just {companyName}'s own staff time that can be claimed for. You can also claim for
        people who worked for {companyName}, but who were paid by an external staff-provider rather
        than {companyName}. These are known as ‘Externally Provided Workers’ (EPWs).
      </p>

      <p>
        If {companyName} paid a company for workers who operated under its direction, these may
        qualify. But if it paid a company to do a specific job, that’s subcontracted R&D and is
        covered in the next section.
      </p>

      <p>
        For connected staff providers, you can claim the lower of: (1) amount paid to the provider,
        or (2) their costs (salaries, NICs, pensions, bonuses, reimbursed R&D expenses).
      </p>

      <label><strong>Did {companyName} use any externally provided workers?</strong></label>
      <div style={{ marginBottom: "15px" }}>
        <label>
          <input
            type="radio"
            name="usedEPWs"
            value="no"
            checked={usedEPWs === "no"}
            onChange={handleRadioChange}
          />{" "}
          No, {companyName} didn’t use any externally provided workers
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="usedEPWs"
            value="yes"
            checked={usedEPWs === "yes"}
            onChange={handleRadioChange}
          />{" "}
          Yes, {companyName} used externally provided workers
        </label>
      </div>

      {usedEPWs === "yes" && (
        <div>
          <label>
            Total amount paid to staff-provider companies for EPWs (£):
            <input
              type="number"
              min="0"
              value={epwCost}
              onChange={(e) => onChange("epwCost", e.target.value)}
              style={{ width: "100%", marginTop: "5px" }}
            />
          </label>
          <br /><br />
          <label>
            For <em>connected</em> staff providers, relevant total cost amount (£):
            <input
              type="number"
              min="0"
              value={connectedEPWCost}
              onChange={(e) => onChange("connectedEPWCost", e.target.value)}
              style={{ width: "100%", marginTop: "5px" }}
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default SubStep5EPWCost;
