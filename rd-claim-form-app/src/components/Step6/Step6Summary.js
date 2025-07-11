import React from "react";
import jsPDF from "jspdf";

function Step6Summary({ formData, onBack }) {
  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    const lines = Object.entries(formData).map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: ${value.join(", ")}`;
      } else if (typeof value === "object" && value !== null) {
        return `${key}: [object]`;
      }
      return `${key}: ${value}`;
    });

    let y = 10;
    lines.forEach((line) => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(line, 10, y);
      y += 8;
    });

    doc.save("rd-claim-summary.pdf");
  };

  const generateTextReport = () => {
    const textContent = Object.entries(formData)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}: ${value.join(", ")}`;
        } else if (typeof value === "object" && value !== null) {
          return `${key}: [object]`;
        }
        return `${key}: ${value}`;
      })
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rd-claim-summary.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

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

  return (
    <div>
      <h2>Step 6: Review Your Claim</h2>

      {Object.entries(groupedSections).map(([sectionTitle, keys]) => (
        <div key={sectionTitle} style={{ marginBottom: "20px" }}>
          <h3>{sectionTitle}</h3>
          <ul>
            {keys.map((key) => (
              <li key={key}>
                <strong>{key}:</strong>{" "}
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
        <button onClick={generatePDFReport}>Download PDF</button>{" "}
        <button onClick={generateTextReport}>Download TXT</button>{" "}
        <button onClick={onBack}>← Back</button>
      </div>
    </div>
  );
}

export default Step6Summary;
