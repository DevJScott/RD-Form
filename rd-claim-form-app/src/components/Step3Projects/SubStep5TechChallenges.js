import React from "react";

function SubStep5TechChallenges({ formData, onChange }) {
  const allChallenges = {
    software: [
      "Trying to find, diagnose and rectify race conditions",
      "Trying to find, diagnose and rectify intermittent faults",
      "Trying to overcome the constraints imposed by legacy systems and code to achieve more modern performance or behaviour",
      "Trying to integrate technologies in ways that they were not designed for",
      "Trying to develop new communications protocols where none existed",
      "Trying to work with technologies with insufficient documentation",
      "Trying to overcome system limitations, such as speed, scale, processing power, storage, latency or responsiveness, where it took time and careful thought to do so.",
      "Trying to design algorithms that would deliver the required performance",
    ],
    process: [
      "Identifying and finding ways to remedy new types of defect",
      "Scaling, where techniques that work on a small scale did not work as predicted on larger scales",
      "Trying to overcome difficulties in achieving a consistent product in the face of variable raw materials, constituent ingredients or components",
      "Trying to overcome other unexpected problems that arose from using different or substituted ingredients or components within the process",
      "Trying to find ways to automate tasks currently performed by people, where no existing machinery was directly applicable",
      "Trying to anticipate and prepare for the interactions between many different steps when designing a new process",
      "Trying to overcome difficulties arising in trying to make adjustments to processes in which variables couldn’t be changed independently",
      "Trying to overcome difficulties that arose in trying to push the limits of production machinery",
      "Finding non-standard ways to reduce waste during the production process",
      "Developing processes that were flexible enough to be applied to multiple products",
      "Improving product composition or configuration, where attempted changes caused a series of new issues",
      "Improving product accuracy and tolerances",
      "Developing automated processes/equipment, where this could not simply be purchased or specified",
      "Developing reverse engineering or remanufacturing techniques",
      "Translating equipment or processes from one area into another, where this threw up new technical challenges",
      "Developing improved mechanisms for incorporation into products",
      "Improving something to make it faster, lighter, stronger, more resilient to failure, or otherwise better in a measurable and objective way",
    ],
    materials: [
      "Trying to overcome difficulties in designing the composition of a new material",
      "Trying to overcome difficulties in the fabrication or manufacture of a new material",
      "Trying to overcome difficulties in the integration of several different materials to produce one with the required specifications",
    ],
    science: [
      "Developing bioassays",
      "Developing scientific protocols",
      "Submitting a scientific paper for publication",
      "Investigating chemical processes and production methods",
      "Developing new chemical/biological formulations",
      "Developing new drugs or treatments for medical/veterinary conditions",
      "Developing improved chemical coatings/finishes",
      "Improving analytical capacities",
    ],
    modelling: [
      "Developing mathematical or computational models",
      "Creating models to predict the behaviour of complex systems",
      "Translating concepts or knowledge from one area into another",
      "Improving data collection techniques/instruments",
      "Developing improved installation methods",
    ],
  };

  const handleToggle = (value) => {
    const selected = formData.techChallenges || [];
    if (selected.includes(value)) {
      onChange("techChallenges", selected.filter((v) => v !== value));
    } else if (selected.length < 5) {
      onChange("techChallenges", [...selected, value]);
    }
  };

  const isChecked = (value) => (formData.techChallenges || []).includes(value);

  const handleOtherChange = (field, value) => {
    onChange(field, value);
  };

  const handleNoChallenges = (checked) => {
    if (checked) {
      onChange("techChallenges", []);
      onChange("noTechChallenges", true);
    } else {
      onChange("noTechChallenges", false);
    }
  };

  return (
    <div>
      <h3>Technical Challenges</h3>
      <p>
        The technical difficulties PLAYCRAFT LTD faced in its projects are key to demonstrating
        to HMRC that the claim is valid. The company doesn’t need to have overcome the issue, just
        be actively trying to solve it.
      </p>
      <p>Please select <strong>up to 5 technical difficulties</strong> PLAYCRAFT LTD faced:</p>

      <label>
        <input
          type="checkbox"
          checked={formData.noTechChallenges || false}
          onChange={(e) => handleNoChallenges(e.target.checked)}
        />{" "}
        PLAYCRAFT LTD encountered no significant technical difficulties during the claim period.
      </label>

      {!formData.noTechChallenges && (
        <>
          {Object.entries(allChallenges).map(([category, items]) => (
            <div key={category}>
              <h4 style={{ textTransform: "capitalize" }}>{category} challenges</h4>
              {items.map((item) => (
                <label key={item} style={{ display: "block", marginBottom: "6px" }}>
                  <input
                    type="checkbox"
                    checked={isChecked(item)}
                    onChange={() => handleToggle(item)}
                  />{" "}
                  {item}
                </label>
              ))}
              <label>
                Other:
                <input
                  type="text"
                  style={{ width: "100%", marginTop: "5px" }}
                  value={formData[`${category}Other`] || ""}
                  onChange={(e) =>
                    handleOtherChange(`${category}Other`, e.target.value)
                  }
                />
              </label>
              <hr />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default SubStep5TechChallenges;
