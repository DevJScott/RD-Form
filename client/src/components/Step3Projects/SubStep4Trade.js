function SubStep4Trade({ formData, onChange }) {
  const companyName = formData.companyName || "the company";

  return (
    <div>
      <h3>Trade</h3>

      <hr style={{ margin: "20px 0" }} />

      <p>
        HMRC will only support claims for R&D that is relevant to the claimant
        company. This means the work claimed for has to be related to{" "}
        <strong>{companyName}</strong>'s trade or industry.
      </p>
      <p>Please select the option that best fits the R&D work:</p>
    </div>
  );
}

export default SubStep4Trade;
