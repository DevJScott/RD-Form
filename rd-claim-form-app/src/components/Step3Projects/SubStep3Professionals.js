import React from "react";

function SubStep3Professionals({ formData, onChange }) {
  const professionals = formData.competentProfessionals || [];

  const updateProfessional = (index, field, value) => {
    const updated = [...professionals];
    updated[index] = { ...updated[index], [field]: value };
    onChange("competentProfessionals", updated);
  };

  const addProfessional = () => {
    onChange("competentProfessionals", [
      ...professionals,
      { name: "", type: "", qualified: false, years: "", details: "" }
    ]);
  };

  const removeProfessional = (index) => {
    const updated = professionals.filter((_, i) => i !== index);
    onChange("competentProfessionals", updated);
  };

  const handleNoProfessionals = (value) => {
    onChange("noCompetentProfessionals", value);
    if (value) {
      onChange("competentProfessionals", []);
      onChange("challengeReasons", []);
    }
  };

  const challengeOptions = [
    "The knowledge we needed was not easily accessible",
    "The knowledge needed was a protected trade secret",
    "Published knowledge (online or printed) was out of date or incomplete",
    "There were conflicting views amongst experts",
    "Data was lacking, incomplete or hard to interpret",
    "Existing knowledge was purely theoretical, with no practical precedent",
    "It was difficult to anticipate how different components or factors would interrelate",
    "The outcome of changing many variables at the same time was complex and unpredictable",
    "None of the above – all the required information was freely available"
  ];

  const toggleChallengeReason = (reason) => {
    const selected = formData.challengeReasons || [];
    if (selected.includes(reason)) {
      onChange("challengeReasons", selected.filter((r) => r !== reason));
    } else {
      onChange("challengeReasons", [...selected, reason]);
    }
  };

  return (
    <div>
      <h3>Competent Professionals</h3>
      <p>
        HMRC states that it’s vital that companies use competent professionals to lead their
        projects and to direct technical problem-solving. They expect a competent professional to:
      </p>
      <ul>
        <li>be knowledgeable about the relevant scientific or technological principles involved;</li>
        <li>be aware of the current state of knowledge in the field as a whole;</li>
        <li>have accumulated experience and have a successful track record.</li>
      </ul>
      <p>
        Please enter details of the competent professionals who worked on{" "}
        <strong>{formData.companyName || "PLAYCRAFT LTD"}</strong>’s projects during this claim year.
        They do not have to be direct employees.
      </p>

      <label>
        <input
          type="checkbox"
          checked={formData.noCompetentProfessionals || false}
          onChange={(e) => handleNoProfessionals(e.target.checked)}
        />{" "}
        PLAYCRAFT LTD didn’t use competent professionals to lead the projects
      </label>

      <hr />

      {!formData.noCompetentProfessionals && (
        <>
          {professionals.map((prof, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "15px" }}>
              <label>
                Name:{" "}
                <input
                  type="text"
                  value={prof.name}
                  onChange={(e) => updateProfessional(index, "name", e.target.value)}
                  style={{ width: "100%" }}
                />
              </label>
              <br />
              <label>
                Type of Worker:{" "}
                <input
                  type="text"
                  value={prof.type}
                  onChange={(e) => updateProfessional(index, "type", e.target.value)}
                  style={{ width: "100%" }}
                />
              </label>
              <br />
              <label>
                Has Qualifications in the Field:{" "}
                <input
                  type="checkbox"
                  checked={prof.qualified}
                  onChange={(e) => updateProfessional(index, "qualified", e.target.checked)}
                />
              </label>
              <br />
              <label>
                Years of Experience:{" "}
                <input
                  type="number"
                  value={prof.years}
                  onChange={(e) => updateProfessional(index, "years", e.target.value)}
                  style={{ width: "100px" }}
                />
              </label>
              <br />
              <label>
                Details (optional):{" "}
                <textarea
                  value={prof.details}
                  onChange={(e) => updateProfessional(index, "details", e.target.value)}
                  style={{ width: "100%" }}
                />
              </label>
              <br />
              <button type="button" onClick={() => removeProfessional(index)} style={{ marginTop: "10px" }}>
                Remove
              </button>
            </div>
          ))}

          <button type="button" onClick={addProfessional}>+ Add Another Professional</button>

          <hr />
          <h4>Why were the technical challenges difficult for your competent professionals?</h4>
          {challengeOptions.map((reason) => (
            <label key={reason} style={{ display: "block", marginBottom: "5px" }}>
              <input
                type="checkbox"
                checked={(formData.challengeReasons || []).includes(reason)}
                onChange={() => toggleChallengeReason(reason)}
              />{" "}
              {reason}
            </label>
          ))}
        </>
      )}
    </div>
  );
}

export default SubStep3Professionals;
