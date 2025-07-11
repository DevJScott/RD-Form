import React from "react";

function SubStep1StaffCost({ formData, onChange }) {
  const handleChange = (field) => (e) => {
    onChange(field, e.target.value);
  };

  return (
    <div>
      <h3>Staff Costs</h3>
      <p><strong>Period:</strong> 01 October 2023 – 30 September 2024</p>
      <p>If PLAYCRAFT LTD employed people during this claim period, it will have incurred costs such as salaries, pensions, NICs, and bonuses. These are all allowable for R&D.</p>

      <label>Salaries (£):</label>
      <input
        type="number"
        value={formData.salaries || ""}
        onChange={handleChange("salaries")}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Employer’s Class 1 NIC contributions (£):</label>
      <input
        type="number"
        value={formData.nic || ""}
        onChange={handleChange("nic")}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Pension contributions (£):</label>
      <input
        type="number"
        value={formData.pension || ""}
        onChange={handleChange("pension")}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Bonuses (£):</label>
      <input
        type="number"
        value={formData.bonuses || ""}
        onChange={handleChange("bonuses")}
        style={{ width: "100%", marginBottom: "20px" }}
      />

      <hr />

      <h4>R&D Time Allocation</h4>
      <p>
        Estimate the percentage of total staff time spent on each R&D project.
        HMRC expects this to rarely exceed 60% for smaller firms and never be 100%.
      </p>

      <label>
        % of staff time on "Reducing the cost and increasing the logistical efficiency, and health & safety capabilities of pop-up soft play products":
      </label>
      <input
        type="number"
        step="0.01"
        value={formData.staffTimePercentage || ""}
        onChange={handleChange("staffTimePercentage")}
        style={{ width: "100%", marginBottom: "20px" }}
      />

      <hr />

      <h4>PAYE / NIC Liabilities</h4>
      <p>If applicable, enter total PAYE and NIC liabilities for the claim period:</p>

      <label>Total PAYE & NIC Liabilities (£):</label>
      <input
        type="number"
        value={formData.payeAndNicLiabilities || ""}
        onChange={handleChange("payeAndNicLiabilities")}
        style={{ width: "100%", marginBottom: "20px" }}
      />

      <hr />

      <h4>Reimbursed Expenses</h4>
      <p>Enter reimbursed R&D-related expenses (e.g. travel, subsistence):</p>

      <label>Reimbursed Expenses (£):</label>
      <input
        type="number"
        value={formData.reimbursedExpenses || ""}
        onChange={handleChange("reimbursedExpenses")}
        style={{ width: "100%", marginBottom: "20px" }}
      />
    </div>
  );
}

export default SubStep1StaffCost;
