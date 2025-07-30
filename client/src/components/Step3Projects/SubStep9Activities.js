import React from "react";

function SubStep9Activities({ formData, onChange }) {
  const routineOptions = [
    "Using search engines to find and review information online",
    "Carrying out market research",
    "Organising funding for the work and preparing budgets",
    "Arranging commercial terms with suppliers",
    "Undertaking artistic, cosmetic or aesthetic design",
    "Fine-tuning and optimising after core technical concepts have been proven",
    "Bug-fixing, where bugs were easily traceable and resolvable",
    "Marketing",
    "Registering patents",
    "Carrying out financial and commercial steps related to the technology",
    "No routine activities were carried out during the claim period"
  ];

  const rAndDOptions = [
    "Consulting with experienced staff or external consult",
    "Defining technical objectives",
    "Assessing technical feasibility",
    "Predicting and preparing for technical issues",
    "Allocating and managing resources",
    "Project managing technical aspects of the project",
    "Identifying, analysing and classifying issues",
    "Creating software specifically to help solve a technical problem",
    "Building and testing prototypes of the intended product",
    "Building and testing software iterations of the intended product",
    "Building and testing pilot plants or hardware",
    "Performing experiments",
    "Designing and running trials",
    "Carrying out other design, testing and analysis required to overcome technical difficulties",
    "Producing documentation or other reports related to the R&D",
    "Maintaining facilities where the work took place",
    "Providing IT support for computers used during the work",
    "Providing security for facilities where work took place",
    "Carrying out administration, finance, HR activities related to the work",
    "Inducting staff onto projects",
    "Training staff, to enable them to participate in the project",
    "Carrying out feasibility studies to inform the direction of R&D"
  ];

  const routineSelected = formData.routineActivities || [];
  const rAndDSelected = formData.rAndDActivities || [];

  const toggleRoutineOption = (item) => {
    let updated;
    if (routineSelected.includes(item)) {
      updated = routineSelected.filter((val) => val !== item);
    } else {
      if (item === "No routine activities were carried out during the claim period") {
        updated = [item];
      } else {
        updated = routineSelected
          .filter((val) => val !== "No routine activities were carried out during the claim period")
          .concat(item);
      }
    }
    onChange("routineActivities", updated);
  };

  const toggleRAndDOption = (item) => {
    let updated;
    if (rAndDSelected.includes(item)) {
      updated = rAndDSelected.filter((val) => val !== item);
    } else if (rAndDSelected.length < 5) {
      updated = [...rAndDSelected, item];
    } else {
      return;
    }
    onChange("rAndDActivities", updated);
  };

  const handleSliderChange = (e) => {
    onChange("rdDirectContributionPercent", Number(e.target.value));
  };

  const handleLocationChange = (e) => {
    onChange("rdLocation", e.target.value);
  };

  const companyName = formData.companyName || "the company";

  return (
    <div>
      <h3>Routine Activities</h3>
      <p>
        Routine activities are those that involve little or no technical risk, usually because the task has been done before and is well understood.
        In claiming for R&D tax relief, it's good practice to show HMRC that the company can separate routine work from eligible R&D.
      </p>

      {routineOptions.map((item) => (
        <label key={item} style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="checkbox"
            checked={routineSelected.includes(item)}
            onChange={() => toggleRoutineOption(item)}
          />{" "}
          {item}
        </label>
      ))}

      <hr style={{ margin: "30px 0" }} />

      <h3>R&D Activities</h3>
      <p>
        These activities directly contribute to R&D — such as managing the project, setting technical goals, testing, or indirect activities like IT support and admin.
      </p>
      <p><strong>Select up to 5 activities {companyName} carried out during the claim.</strong></p>

      {rAndDOptions.map((item) => (
        <label key={item} style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="checkbox"
            checked={rAndDSelected.includes(item)}
            onChange={() => toggleRAndDOption(item)}
            disabled={!rAndDSelected.includes(item) && rAndDSelected.length >= 5}
          />{" "}
          {item}
        </label>
      ))}

      <hr style={{ margin: "30px 0" }} />

      <h3>R&D Contribution Estimate</h3>
      <p>
        Use the slider to estimate what percentage of the R&D work was made up of direct contributions.
      </p>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={formData.rdDirectContributionPercent || 0}
        onChange={handleSliderChange}
        style={{ width: "100%" }}
      />
      <div style={{ textAlign: "center", marginTop: "8px", fontWeight: "bold" }}>
        {formData.rdDirectContributionPercent || 0}%
      </div>

      <hr style={{ margin: "30px 0" }} />

      <h3>R&D Location</h3>
      <p>Where did {companyName}’s R&D activity take place during this claim period?</p>
      <div style={{ marginBottom: "15px" }}>
        {["All activity was in the UK", "All activity was overseas", "Activity was in both the UK and overseas"].map((option) => (
          <label key={option} style={{ display: "block", marginBottom: "8px" }}>
            <input
              type="radio"
              name="rdLocation"
              value={option}
              checked={formData.rdLocation === option}
              onChange={handleLocationChange}
            />{" "}
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

export default SubStep9Activities;
