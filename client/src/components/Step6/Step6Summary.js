import React from "react";
import { generateNarrativePDF } from "../../utils/pdfGenerator";

// R&D scheme detection logic
const determineRDScheme = (formData) => {
  const totalStaff =
    Number(formData.directorCount || 0) + Number(formData.staffCount || 0);
  const partOfGroup = formData.partOfGroup === "Yes";
  const hasConnectedCompanies = formData.hasConnectedCompanies === "Yes";
  const receivedGrants =
    formData.stateAidGrants === "Yes" || formData.nonStateAidGrants === "Yes";
  const actedAsSubcontractor = formData.actedAsSubcontractor === "rdInvolved";

  const isSME = totalStaff < 500 && !partOfGroup && !hasConnectedCompanies;

  if (!isSME || receivedGrants || actedAsSubcontractor) return "RDEC";
  return "SME";
};

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
  actedAsSubcontractor: "Acted as a Subcontractor",
  // Extend as needed...
};

const formatField = (key, value) => {
  const label = labels[key] || key;
  if (Array.isArray(value)) return `${label}: ${value.join(", ")}`;
  if (typeof value === "object" && value !== null) return `${label}: [object]`;
  return `${label}: ${value !== "" && value !== undefined ? value : "—"}`;
};

function Step6Summary({ formData, onBack }) {
  const scheme = determineRDScheme(formData);

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
    ...(scheme === "SME" && {
      "SME-Specific Details": ["rdSalaryPortion", "usedVolunteers", "volunteerCost"]
    }),
    ...(scheme === "RDEC" && {
      "RDEC-Specific Details": ["actedAsSubcontractor", "stateAidGrants", "nonStateAidGrants"]
    }),
    "Step 4: Costs": [
      "staffTimeSplit", "staffTimeSplitMethod", "rdSalaryPortion", "employerNIC",
      "employerPension", "bonusExpense", "expenseReimbursement", "totalStaffCost",
      "usedSoftware", "softwareTools", "softwareTotal", "rawMaterialCost",
      "heatLightPaymentType", "heatLightTotalCost", "useDefaultHeatLightSplit",
      "heatLightProjectSplit", "usedEPWs", "epwCost", "connectedEPWCost",
      "usedSubcontractors", "subcontractorCost", "connectedSubcontractorCost"
    ],
    "Step 5: Project Descriptions": [
      "technicalLead", "scienceField", "projectStart", "projectEnd",
      "industrybaseline", "technologicaladvance", "technologicaluncertainties",
      "technicalresolutions", "imageCaption"
    ]
  };

  const generateTextReport = () => {
    let textContent = `R&D Scheme Detected: ${scheme}\n`;

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
          scheme,
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
    <div className="step-wrapper">
      <h2>✅ Step 6: Review and Finalize</h2>
      <h3>📌 R&D Scheme Detected: <span style={{ color: scheme === "SME" ? "green" : "blue" }}>{scheme}</span></h3>

      {Object.entries(groupedSections).map(([section, keys]) => (
        <div key={section} className="section-card">
          <h3>{section}</h3>
          <ul>
            {keys.map((key) => (
              <li key={key}>
                <strong>{labels[key] || key}:</strong>{" "}
                {Array.isArray(formData[key])
                  ? formData[key].join(", ")
                  : formData[key] !== null && formData[key] !== undefined
                  ? String(formData[key])
                  : "—"}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="form-group" style={{ marginTop: "30px" }}>
        <button onClick={() => generateNarrativePDF(formData)}>📄 Download Full R&D Report</button>{" "}
        <button onClick={generateTextReport}>📄 Download TXT</button>{" "}
        <button onClick={handleSubmitToBackend}>🚀 Submit Claim</button>{" "}
        <button onClick={onBack}>⬅ Back</button>
      </div>
    </div>
  );
}

export default Step6Summary;
