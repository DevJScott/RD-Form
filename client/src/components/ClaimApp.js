import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Step1Qualification from "./Step1/Step1Qualification";
import Step2CompanyBasics from "./Step2/Step2CompanyBasics";
import Step3Projects from "./Step3Projects/Step3Projects";
import Step4Costs from "./Step4/Step4Costs";
import Step5Descriptions from "./Step5/Step5Descriptions";
import Step6Summary from "./Step6/Step6Summary";
import ProgressBar from "./ProgressBar";

const defaultFormData = {
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
};

function ClaimApp() {
  const { claimId: routeClaimId } = useParams();
  const [step, setStep] = useState(1);
  const [claimId, setClaimId] = useState(routeClaimId || null);
  const [formData, setFormData] = useState(defaultFormData);

  const steps = [
    { number: 1, title: "Eligibility" },
    { number: 2, title: "Company Info" },
    { number: 3, title: "Projects" },
    { number: 4, title: "Costs" },
    { number: 5, title: "Descriptions" },
    { number: 6, title: "Summary" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!claimId || !token) return;

    const fetchClaim = async () => {
      try {
        const res = await fetch(`/api/claims/${claimId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          const formData = data.form_data || {};
          setFormData({ ...defaultFormData, ...formData });
          setStep(data.current_step || 1);
        } else {
          console.error("❌ Error fetching claim:", data.error);
        }
      } catch (err) {
        console.error("❌ Network error:", err);
      }
    };

    fetchClaim();
  }, [claimId]);

  const saveDraft = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`/api/claims${claimId ? `/${claimId}` : ""}`, {
        method: claimId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          formData: data,
          isDraft: true,
          currentStep: step,
          claimTitle: data.companyName
            ? `${data.companyName} R&D Claim`
            : "R&D Claim",
        }),
      });

      const saved = await res.json();
      if (!claimId && saved.claim && saved.claim.id) {
        setClaimId(saved.claim.id);
      }
    } catch (err) {
      console.error("Auto-save error:", err);
    }
  };

  const updateForm = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      saveDraft(updated);
      return updated;
    });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="app-container">
      <nav className="sidebar">
        <h2>Jump to Section</h2>
        {steps.map(({ number, title }) => (
          <button
            key={number}
            className={`nav-button ${step === number ? "active" : ""}`}
            onClick={() => setStep(number)}
          >
            Step {number}: {title}
          </button>
        ))}
      </nav>

      <div className="main-content">
        <ProgressBar currentStep={step} totalSteps={steps.length} />
        {step === 1 && (
          <Step1Qualification
            formData={formData}
            onChange={updateForm}
            onNext={nextStep}
          />
        )}
        {step === 2 && (
          <Step2CompanyBasics
            formData={formData}
            onChange={updateForm}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 3 && (
          <Step3Projects
            formData={formData}
            onChange={updateForm}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 4 && (
          <Step4Costs
            formData={formData}
            onChange={updateForm}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 5 && (
          <Step5Descriptions
            formData={formData}
            onChange={updateForm}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 6 && <Step6Summary formData={formData} onBack={prevStep} />}
      </div>
    </div>
  );
}

export default ClaimApp;
