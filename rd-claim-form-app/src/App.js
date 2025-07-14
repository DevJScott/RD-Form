// App.js
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ClaimApp from "./components/ClaimApp"; // You must create this file!
import "./index.css";

function App() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // All your form fields...
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/claim"
          element={
            <ClaimApp
              formData={formData}
              updateForm={updateForm}
              step={step}
              setStep={setStep}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
