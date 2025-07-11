// App.js
import { useState } from "react";
import Step1Qualification from "./components/Step1/Step1Qualification";
import Step2CompanyBasics from "./components/Step2/Step2CompanyBasics";
import Step3Projects from "./components/Step3Projects/Step3Projects";
import Step4Costs from "./components/Step4/Step4Costs";
import Step5Descriptions from "./components/Step5/Step5Descriptions";
import Step6Summary from "./components/Step6/Step6Summary";
import ProgressBar from "./components/ProgressBar";
import "./index.css";

function App() {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, label: "Qualification" },
    { id: 2, label: "Company Basics" },
    { id: 3, label: "Projects" },
    { id: 4, label: "Costs" },
    { id: 5, label: "Project Description" },
    { id: 6, label: "Summary" },
  ];

  const [formData, setFormData] = useState({
  // Step 1
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

  // Step 2
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

  // Step 3
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

  // Step 4
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

  // Step 5
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

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="app-container">
      <nav className="sidebar">
        <h2>Jump to Section</h2>
        {steps.map((s) => (
          <button
            key={s.id}
            className={`nav-button ${step === s.id ? "active" : ""}`}
            onClick={() => setStep(s.id)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <div className="main-content">
        <ProgressBar currentStep={step} totalSteps={steps.length} />

        <div className="step-indicator">
          {steps.map((s, index) => (
            <div key={s.id} className={`step-item ${step === s.id ? "active" : ""}`}>
              <span className="step-icon">{index + 1}</span>
              <span className="step-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className={`step-wrapper step-${step}`}>
          <h1>R&D Claim Application</h1>
          <p>Step {step} of {steps.length}</p>

          {step === 1 && (
            <Step1Qualification formData={formData} onChange={updateForm} onNext={nextStep} />
          )}
          {step === 2 && (
            <Step2CompanyBasics formData={formData} onChange={updateForm} onNext={nextStep} onBack={prevStep} />
          )}
          {step === 3 && (
            <Step3Projects formData={formData} onChange={updateForm} onNext={nextStep} onBack={prevStep} />
          )}
          {step === 4 && (
            <Step4Costs formData={formData} onChange={updateForm} onNext={nextStep} onBack={prevStep} />
          )}
          {step === 5 && (
            <Step5Descriptions formData={formData} onChange={updateForm} onNext={nextStep} onBack={prevStep} />
          )}
          {step === 6 && (
            <Step6Summary formData={formData} onBack={prevStep} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
