import { useState } from "react";
import SubStep1Aims from "./SubStep1Aims";
import SubStep2Subcontractor from "./SubStep2Subcontractor";
import SubStep3Professionals from "./SubStep3Professionals";
import SubStep4Trade from "./SubStep4Trade";
import SubStep5TechChallenges from "./SubStep5TechChallenges";
import SubStep6ChallengeLevel from "./SubStep6ChallengeLevel";
import SubStep7ScienceArea from "./SubStep7ScienceArea";
import SubStep8TimeSpan from "./SubStep8TimeSpan";
import SubStep9Activities from "./SubStep9Activities";
import SubStep10Evidence from "./SubStep10Evidence";
import SubStep11Grants from "./SubStep11Grants";
import SubStep12Titles from "./SubStep12Titles";

const TOTAL_SUBSTEPS = 12;

function Step3Projects({ formData, onChange, onNext, onBack }) {
  const [subStep, setSubStep] = useState(1);

  const nextSub = () => setSubStep((prev) => Math.min(prev + 1, TOTAL_SUBSTEPS));
  const prevSub = () => setSubStep((prev) => Math.max(prev - 1, 1));

  const isLast = subStep === TOTAL_SUBSTEPS;

  const renderSubStep = () => {
    switch (subStep) {
      case 1: return <SubStep1Aims formData={formData} onChange={onChange} />;
      case 2: return <SubStep2Subcontractor formData={formData} onChange={onChange} />;
      case 3: return <SubStep3Professionals formData={formData} onChange={onChange} />;
      case 4: return <SubStep4Trade formData={formData} onChange={onChange} />;
      case 5: return <SubStep5TechChallenges formData={formData} onChange={onChange} />;
      case 6: return <SubStep6ChallengeLevel formData={formData} onChange={onChange} />;
      case 7: return <SubStep7ScienceArea formData={formData} onChange={onChange} />;
      case 8: return <SubStep8TimeSpan formData={formData} onChange={onChange} />;
      case 9: return <SubStep9Activities formData={formData} onChange={onChange} />;
      case 10: return <SubStep10Evidence formData={formData} onChange={onChange} />;
      case 11: return <SubStep11Grants formData={formData} onChange={onChange} />;
      case 12: return <SubStep12Titles formData={formData} onChange={onChange} />;
      default: return null;
    }
  };

  return (
    <div>
      <h2>Step 3: Projects</h2>
      <p>Section {subStep} of {TOTAL_SUBSTEPS}</p>

      {renderSubStep()}

      <div style={{ marginTop: "20px" }}>
        {subStep > 1 && <button onClick={prevSub}>Back</button>}{" "}
        {!isLast && <button onClick={nextSub}>Next</button>}
        {isLast && <button onClick={onNext}>Continue to Step 4</button>}
      </div>

      <br />
      <button onClick={onBack}>← Back to Step 2</button>
    </div>
  );
}

export default Step3Projects;
