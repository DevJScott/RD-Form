import React from "react";

function SubStep11Grants({ formData, onChange }) {
  return (
    <div>
      <h3>Grants and Funding</h3>
      <p>
        Having received grant funding will never stop a company being able to make a claim, but the size and type of the grant can have a significant impact on the claim size. 
        Even where grants were not used on R&D projects, it’s important to include this information in the claim.
      </p>
      <p style={{ fontStyle: "italic" }}>
        Remember that any CBILS/BBLS loans received are classed as Notified State Aid and should be included below.
      </p>

      <label style={{ display: "block", marginTop: "20px" }}>
        <strong>Total State Aid grants received during the claim period (£):</strong>
        <input
          type="number"
          value={formData.stateAidGrants || ""}
          onChange={(e) => onChange("stateAidGrants", e.target.value)}
          style={{ width: "100%", marginTop: "5px" }}
        />
      </label>

      <label style={{ display: "block", marginTop: "20px" }}>
        <strong>Total non-State Aid grants and funding received during the claim period (£):</strong>
        <input
          type="number"
          value={formData.nonStateAidGrants || ""}
          onChange={(e) => onChange("nonStateAidGrants", e.target.value)}
          style={{ width: "100%", marginTop: "5px" }}
        />
      </label>
    </div>
  );
}

export default SubStep11Grants;
