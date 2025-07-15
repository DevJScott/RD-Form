// src/components/ClaimApp.js
import { useState } from "react";
import Step1Qualification from "./Step1/Step1Qualification";
import Step2CompanyBasics from "./Step2/Step2CompanyBasics";
import Step3Projects from "./Step3Projects/Step3Projects";
import Step4Costs from "./Step4/Step4Costs";
import Step5Descriptions from "./Step5/Step5Descriptions";
import Step6Summary from "./Step6/Step6Summary";
import ProgressBar from "./ProgressBar";

function ClaimApp() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    isLimitedCompany: "",
    paysCorpTax: "",
    inAdministration: "",
    inLiquidation: "",
    accountsPreparedOnGoingConcern: "",
    understandsGoingConcernWarning: false,
    claimStartDate: "",
    claimEndDate: "",
    hasClaimedBefore: "",
    hasNotifiedHMRC: "",
    companyName: "",
    informalCompanyName: "",
    useFullName: false,
    contactName: "",
    companySize: "",
    industry: "",
    directorCount: "",
    staffCount: "",
    subcontractorCount: "",
    revenue: "",
    balanceSheetAssets: "",
    tradingExpenses: "",
    capitalisedRAndD: "",
    profitOrLoss: "",
    partOfGroup: "",
    hasConnectedCompanies: "",
    otherShareholders25Plus: "",
    ownsOtherCompanies25Plus: "",
    projectAims: "",
    subcontractorsUsed: "",
    subcontractorNames: "",
    subcontractorWork: "",
    subcontractorLocation: "",
    externalProfessionalsUsed: "",
    professionalDetails: "",
    projectExploitedCommercially: "",
    projectOutputs: "",
    projectPatents: "",
    technologicalChallenges: "",
    knowledgeLimitations: "",
    advanceBeyondIndustryStandard: "",
    industryComparisonDetails: "",
    scientificField: "",
    technicalField: "",
    developmentStartDate: "",
    developmentEndDate: "",
    developmentActivities: "",
    documentationEvidence: "",
    stateAidGrants: "",
    nonStateAidGrants: "",
    projectCount: "",
    projectTitles: [],
    staffTimeSplit: "",
    staffTimeSplitMethod: "",
    rdSalaryPortion: "",
    employerNIC: "",
    employerPension: "",
    bonusExpense: "",
    expenseReimbursement: "",
    totalStaffCost: "",
    usedSoftware: "",
    softwareTools: "",
    softwareTotal: "",
    usedVolunteers: "",
    volunteerCost: "",
    rawMaterialCost: "",
    heatLightPaymentType: "",
    heatLightTotalCost: "",
    useDefaultHeatLightSplit: "",
    heatLightProjectSplit: "",
    usedEPWs: "",
    epwCost: "",
    connectedEPWCost: "",
    usedSubcontractors: "",
    subcontractorCost: "",
    connectedSubcontractorCost: "",
    technicalLead: "",
    scienceField: "",
    projectStart: "",
    projectEnd: "",
    industrybaseline: "",
    technologicaladvance: "",
    technologicaluncertainties: "",
    technicalresolutions: "",
    supportingImage: null,
    imageCaption: "",
  });

  const updateForm = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="app-container">
      <nav className="sidebar">
        <h2>Jump to Section</h2>
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <button
            key={s}
            className={`nav-button ${step === s ? "active" : ""}`}
            onClick={() => setStep(s)}
          >
            Step {s}
          </button>
        ))}
      </nav>

      <div className="main-content">
        <ProgressBar currentStep={step} totalSteps={6} />
        {step === 1 && <Step1Qualification formData={formData} onChange={updateForm} onNext={nextStep} />}
        {step === 2 && <Step2CompanyBasics formData={formData} onChange={updateForm} onNext={nextStep} onBack={prevStep} />}
        {step === 3 && <Step3Projects formData={formData} onChange={updateForm} onNext={nextStep} onBack={prevStep} />}
        {step === 4 && <Step4Costs formData={formData} onChange={updateForm} onNext={nextStep} onBack={prevStep} />}
        {step === 5 && <Step5Descriptions formData={formData} onChange={updateForm} onNext={nextStep} onBack={prevStep} />}
        {step === 6 && <Step6Summary formData={formData} onBack={prevStep} />}
      </div>
    </div>
  );
}

export default ClaimApp;
