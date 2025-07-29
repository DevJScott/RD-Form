import React from "react";

function SubStep2Subcontractor({ formData, onChange }) {
  const companyName = formData.companyName || "the company";

  return (
    <div>
      <h3>Acting as a Subcontractor</h3>
      <p>
        The rules around claiming R&D tax relief while acting as a subcontractor can be complex.
        The questions in this section will help to establish how much work{" "}
        <strong>{companyName}</strong> did as a subcontractor,
        and whether it can claim for the costs of this work.
      </p>

      <p>
        Between <strong>01 October 2023</strong> and <strong>30 September 2024</strong>, did{" "}
        <strong>{companyName}</strong> work as a subcontractor to other companies?
      </p>

      <label>
        <input
          type="radio"
          name="actedAsSubcontractor"
          value="noWork"
          checked={formData.actedAsSubcontractor === "noWork"}
          onChange={() => onChange("actedAsSubcontractor", "noWork")}
        />
        {" "}No, it didn’t work as a subcontractor to other companies
      </label>
      <br />

      <label>
        <input
          type="radio"
          name="actedAsSubcontractor"
          value="routineWorkOnly"
          checked={formData.actedAsSubcontractor === "routineWorkOnly"}
          onChange={() => onChange("actedAsSubcontractor", "routineWorkOnly")}
        />
        {" "}Yes, it did work as a subcontractor to other companies, but no R&D was involved. All the work was routine.
      </label>
      <br />

      <label>
        <input
          type="radio"
          name="actedAsSubcontractor"
          value="rdInvolved"
          checked={formData.actedAsSubcontractor === "rdInvolved"}
          onChange={() => onChange("actedAsSubcontractor", "rdInvolved")}
        />
        {" "}Yes, it did work as a subcontractor to other companies, and some R&D was involved — either for its client, or on its own account.
      </label>
    </div>
  );
}

export default SubStep2Subcontractor;
