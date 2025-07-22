import React from "react";
import { generateNarrativePDF } from "../../utils/pdfGenerator";


// Optional: Map field keys to human-readable labels
const labels = {
  isLimitedCompany: "Is a Limited Company",
  paysCorpTax: "Pays Corporation Tax",
  inAdministration: "In Administration",
  companyName: "Company Name",
  informalCompanyName: "Informal Company Name",
  claimStartDate: "Claim Start Date",
  claimEndDate: "Claim End Date",
  rdSalaryPortion: "R&D Salary Portion",
  projectAims: "Project Aims",
  technologicalChallenges: "Technological Challenges",
  projectOutputs: "Project Outputs",
  // Add more as needed...
};

const formatField = (key, value) => {
  const label = labels[key] || key;
  if (Array.isArray(value)) return `${label}: ${value.join(", ")}`;
  if (typeof value === "object" && value !== null) return `${label}: [object]`;
  return `${label}: ${value !== "" ? value : "—"}`;
};

function Step6Summary({ formData, onBack }) {
  const groupedSections = {
    "Step 1: Eligibility & Qualification": [
      "isLimitedCompany", "paysCorpTax", "inAdministration", "inLiquidation",
      "accountsPreparedOnGoingConcern", "understandsGoingConcernWarning",
      "claimStartDate", "claimEndDate", "hasClaimedBefore", "hasNotifiedHMRC",
    ],
    "Step 2: Company Basics": [
      "companyName", "informalCompanyName", "useFullName", "contactName",
      "companySize", "industry", "directorCount", "staffCount", "subcontractorCount",
      "revenue", "balanceSheetAssets", "tradingExpenses", "capitalisedRAndD",
      "profitOrLoss", "partOfGroup", "hasConnectedCompanies",
      "otherShareholders25Plus", "ownsOtherCompanies25Plus",
    ],
    "Step 3: Projects & Technical Details": [
      "projectAims", "subcontractorsUsed", "subcontractorNames", "subcontractorWork",
      "subcontractorLocation", "externalProfessionalsUsed", "professionalDetails",
      "projectExploitedCommercially", "projectOutputs", "projectPatents",
      "technologicalChallenges", "knowledgeLimitations", "advanceBeyondIndustryStandard",
      "industryComparisonDetails", "scientificField", "technicalField",
      "developmentStartDate", "developmentEndDate", "developmentActivities",
      "documentationEvidence", "stateAidGrants", "nonStateAidGrants",
      "projectCount", "projectTitles"
    ],
    "Step 4: Costs": [
      "staffTimeSplit", "staffTimeSplitMethod", "rdSalaryPortion", "employerNIC",
      "employerPension", "bonusExpense", "expenseReimbursement", "totalStaffCost",
      "usedSoftware", "softwareTools", "softwareTotal", "usedVolunteers",
      "volunteerCost", "rawMaterialCost", "heatLightPaymentType", "heatLightTotalCost",
      "useDefaultHeatLightSplit", "heatLightProjectSplit", "usedEPWs", "epwCost",
      "connectedEPWCost", "usedSubcontractors", "subcontractorCost", "connectedSubcontractorCost"
    ],
    "Step 5: Project Descriptions": [
      "technicalLead", "scienceField", "projectStart", "projectEnd",
      "industrybaseline", "technologicaladvance", "technologicaluncertainties",
      "technicalresolutions", "imageCaption"
    ]
  };

  const generateTextReport = () => {
    let textContent = "";

    Object.entries(groupedSections).forEach(([section, keys]) => {
      textContent += `\n=== ${section} ===\n`;
      keys.forEach((key) => {
        textContent += formatField(key, formData[key]) + "\n";
      });
    });

    textContent += `\nDeclaration: I confirm this information is accurate and complete for the purposes of HMRC R&D Tax Relief.`;

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rd-claim-summary.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmitToBackend = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...formData,
          isComplete: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("❌ Failed to save claim: " + (data.error || "Unknown error"));
        return;
      }

      alert("✅ Claim submitted successfully!");
    } catch (err) {
      alert("❌ Network error: " + err.message);
    }
  };

  return (
    <div>
      <h2>✅ Step 6: Review and Finalize</h2>

      {Object.entries(groupedSections).map(([section, keys]) => (
        <div key={section} style={{ marginBottom: "20px" }}>
          <h3>{section}</h3>
          <ul>
            {keys.map((key) => (
              <li key={key}>
                <strong>{labels[key] || key}:</strong>{" "}
                {Array.isArray(formData[key])
                  ? formData[key].join(", ")
                  : formData[key] !== null
                  ? String(formData[key])
                  : "—"}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => generateNarrativePDF(formData)}>📄 Download Full R&D Report</button>
        <button onClick={generateTextReport}>📄 Download TXT</button>
        <button onClick={handleSubmitToBackend}>🚀 Submit Claim</button>
        <button onClick={onBack}>⬅ Back</button>
      </div>
    </div>
  );
}

export default Step6Summary;
