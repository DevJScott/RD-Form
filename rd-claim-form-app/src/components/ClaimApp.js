import Step1Qualification from "./Step1/Step1Qualification";
import Step2CompanyBasics from "./Step2/Step2CompanyBasics";
import Step3Projects from "./Step3Projects/Step3Projects";
import Step4Costs from "./Step4/Step4Costs";
import Step5Descriptions from "./Step5/Step5Descriptions";
import Step6Summary from "./Step6/Step6Summary";
import ProgressBar from "./ProgressBar";

const ClaimApp = ({ formData, updateForm, step, setStep }) => {
  const steps = [
    { id: 1, label: "Qualification" },
    { id: 2, label: "Company Basics" },
    { id: 3, label: "Projects" },
    { id: 4, label: "Costs" },
    { id: 5, label: "Project Description" },
    { id: 6, label: "Summary" },
  ];

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
};

export default ClaimApp;
