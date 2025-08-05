import React from "react";

function SubStep8TimeSpan({ formData }) {
  const companyName = formData.companyName || "the company";

  const claimStartDate = new Date(formData.claimStartDate);
  const claimEndDate = new Date(formData.claimEndDate);
  const startMonth = claimStartDate.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
  const endMonth = claimEndDate.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <h3>Time Span of Technical Problem Solving</h3>
      <p>
        HMRC needs to know when <strong>{companyName}</strong> was actively
        working to overcome technical challenges. This activity must fall within
        the claim period below:
      </p>

      <div style={{ marginTop: "20px" }}>
        <strong>Claim Start:</strong> {startMonth}
      </div>

      <div style={{ marginTop: "15px" }}>
        <strong>Claim End:</strong> {endMonth}
      </div>

      <p style={{ marginTop: "20px" }}>
        If your technical work extended beyond this claim period, we’ll capture
        that separately in Step 4.
      </p>
    </div>
  );
}

export default SubStep8TimeSpan;
