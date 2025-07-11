import { useState } from "react";
import SubStep1StaffCost from "./SubStep1StaffCost";
import SubStep2SoftwareCost from "./SubStep2SoftwareCost";
import SubStep3ClinicalTrialsCost from "./SubStep3ClinicalTrialsCost";
import SubStep4ConsumablesCost from "./SubStep4ConsumablesCost";
import SubStep5EPWCost from "./SubStep5EPWCost";
import SubStep6SubcontractorCost from "./SubStep6SubcontractorCost";

const TOTAL_SUBSTEPS = 6;

function Step4Costs({ formData, onChange, onNext, onBack }) {
  const [subStep, setSubStep] = useState(1);

  const nextSub = () => setSubStep((prev) => Math.min(prev + 1, TOTAL_SUBSTEPS));
  const prevSub = () => setSubStep((prev) => Math.max(prev - 1, 1));
  const isLast = subStep === TOTAL_SUBSTEPS;

  const renderSubStep = () => {
    switch (subStep) {
      case 1: return <SubStep1StaffCost formData={formData} onChange={onChange} />;
      case 2: return <SubStep2SoftwareCost formData={formData} onChange={onChange} />;
      case 3: return <SubStep3ClinicalTrialsCost formData={formData} onChange={onChange} />;
      case 4: return <SubStep4ConsumablesCost formData={formData} onChange={onChange} />;
      case 5: return <SubStep5EPWCost formData={formData} onChange={onChange} />;
      case 6: return <SubStep6SubcontractorCost formData={formData} onChange={onChange} />;
      default: return null;
    }
  };

  return (
    <div>
      <h2>Step 4: Costs</h2>
      <p>Section {subStep} of {TOTAL_SUBSTEPS}</p>

      {renderSubStep()}

      <div style={{ marginTop: "20px" }}>
        {subStep > 1 && <button onClick={prevSub}>Back</button>}{" "}
        {!isLast && <button onClick={nextSub}>Next</button>}
        {isLast && <button onClick={onNext}>Continue to Step 5</button>}
      </div>

      <br />
      <button onClick={onBack}>← Back to Step 3</button>
    </div>
  );
}

export default Step4Costs;
