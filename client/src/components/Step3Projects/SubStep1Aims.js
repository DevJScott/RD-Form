import React, { useState } from "react";

function SubStep1Aims({ formData, onChange }) {
  const [expanded, setExpanded] = useState({
    marketObjectives: true, // optional default open
  });

  const toggle = (groupKey) => {
    setExpanded((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  const handleCheckbox = (group, option) => {
    const current = formData[group] || [];
    if (current.includes(option)) {
      onChange(
        group,
        current.filter((item) => item !== option),
      );
    } else {
      onChange(group, [...current, option]);
    }
  };

  const handleTextChange = (field, value) => {
    onChange(field, value);
  };

  const handleSliderChange = (field, value) => {
    onChange(field, Number(value));
  };

  const objectiveGroups = [
    {
      title: "Market-Related Objectives",
      key: "marketObjectives",
      options: [
        "Undertook work to understand target markets better",
        "Segmented its markets",
        "Repositioned its offering",
        "Diversified into new markets",
        "Increased market share",
      ],
      otherField: "marketObjectivesOther",
    },
    {
      title: "Competition-Related Objectives",
      key: "competitionObjectives",
      options: [
        "Caught up with the advances of competitors",
        "Moved ahead of competitors",
        "Reverse-engineered competitors’ products",
        "Purchased a competitor",
      ],
      otherField: "competitionObjectivesOther",
    },
    {
      title: "Scale-Related Objectives",
      key: "scaleObjectives",
      options: [
        "Expanded the number of sites",
        "Increased production capacity at one or more sites",
        "Achieved greater automation through machinery or software",
        "Adopted technologies capable of greater performance",
      ],
      otherField: "scaleObjectivesOther",
    },
    {
      title: "Process-Related Objectives",
      key: "processObjectives",
      options: [
        "Improved business processes",
        "Improved manufacturing processes",
        "Reduced defects and re-work",
        "Introduced more efficient equipment or machinery",
      ],
      otherField: "processObjectivesOther",
    },
    {
      title: "Product-Related Objectives",
      key: "productObjectives",
      options: [
        "Developed one or more new products or services",
        "Altered existing products or services to comply with new legislation",
        "Altered existing products or services to include new knowledge or components",
        "Improved one or more products in a measurable and objective way",
      ],
      otherField: "productObjectivesOther",
    },
    {
      title: "Finance-Related Objectives",
      key: "financeObjectives",
      options: [
        "Sought investment or other forms of financing",
        "Reduced staff numbers or implemented other restructuring",
        "Sought to drive up revenues through better sales and marketing",
        "Sought to drive up revenues through new and improved products",
        "Sought to reduce costs e.g. renegotiating contracts, changing suppliers, or any other initiative.",
      ],
      otherField: "financeObjectivesOther",
    },
  ];

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "dd/mm/yyyy";

  return (
    <div>
      <h2>Step 3: Projects</h2>
      <h4>Section 1 of 10</h4>

      <p>
        Now that we’ve covered off the basics, we need you to tell us about the
        work that {formData.companyName || "the company"} did between{" "}
        <strong>{formatDate(formData.claimStartDate)}</strong> and{" "}
        <strong>{formatDate(formData.claimEndDate)}</strong>.
      </p>

      <p>
        Select up to 4 objectives of the commercial or technical work that{" "}
        {formData.companyName || "the company"} completed this accounting
        period.
      </p>

      <hr />

      {objectiveGroups.map(({ title, key, options, otherField }) => (
        <div key={key} style={{ marginBottom: "20px" }}>
          <div
            onClick={() => toggle(key)}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.1em",
              marginBottom: "5px",
            }}
          >
            {title} {expanded[key] ? "▲" : "▼"}
          </div>
          {expanded[key] && (
            <div style={{ paddingLeft: "10px", marginBottom: "10px" }}>
              {options.map((item) => (
                <label
                  key={item}
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  <input
                    type="checkbox"
                    checked={(formData[key] || []).includes(item)}
                    onChange={() => handleCheckbox(key, item)}
                  />{" "}
                  {item}
                </label>
              ))}
              <label style={{ display: "block", marginTop: "10px" }}>
                Other:
                <input
                  type="text"
                  value={formData[otherField] || ""}
                  onChange={(e) => handleTextChange(otherField, e.target.value)}
                  style={{ width: "100%", padding: "6px", marginTop: "5px" }}
                />
              </label>
            </div>
          )}
          <hr />
        </div>
      ))}

      <div
        style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}
      >
        {[
          ...(formData.productObjectives || []),
          ...(formData.processObjectives || []),
          ...(formData.scaleObjectives || []),
          ...(formData.marketObjectives || []),
          ...(formData.competitionObjectives || []),
          ...(formData.financeObjectives || []),
        ].length > 0 ? (
          <p>
            ✅ Based on the project aims selected, the work{" "}
            {formData.companyName || "the company"} carried out between{" "}
            <strong>{formatDate(formData.claimStartDate)}</strong> and{" "}
            <strong>{formatDate(formData.claimEndDate)}</strong> may be eligible
            for R&D tax relief. The activities align with HMRC’s expectations
            for commercial and technical advancement.
          </p>
        ) : (
          <p style={{ color: "red" }}>
            ⚠️ You haven’t selected any project aims yet. Without a clear
            commercial or technical goal, the project may not be eligible for
            R&D tax relief under HMRC guidance.
          </p>
        )}
      </div>

      <hr />
      {/* Sliders remain unchanged */}
      <h4>Technical Goal — Generating New Knowledge</h4>
      <input
        type="range"
        min="0"
        max="3"
        step="1"
        value={formData.techKnowledgeSlider || 0}
        onChange={(e) =>
          handleSliderChange("techKnowledgeSlider", e.target.value)
        }
        style={{ width: "100%" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Not at all</span>
        <span>A little</span>
        <span>Quite a bit</span>
        <span>Yes, loads!</span>
      </div>

      <h4>Technical Goal — Early Stage Commercialisation</h4>
      <input
        type="range"
        min="0"
        max="3"
        step="1"
        value={formData.earlyCommercialSlider || 0}
        onChange={(e) =>
          handleSliderChange("earlyCommercialSlider", e.target.value)
        }
        style={{ width: "100%" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Not at all</span>
        <span>A little</span>
        <span>Quite a bit</span>
        <span>Yes, loads!</span>
      </div>

      <h4>Technical Goal — Measurable Improvements to Existing Tech</h4>
      <input
        type="range"
        min="0"
        max="3"
        step="1"
        value={formData.techImprovementSlider || 0}
        onChange={(e) =>
          handleSliderChange("techImprovementSlider", e.target.value)
        }
        style={{ width: "100%" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Not at all</span>
        <span>A little</span>
        <span>Quite a bit</span>
        <span>Yes, loads!</span>
      </div>

      <h4>Technical Goal — Alternative Ways to Achieve the Same Outcome</h4>
      <input
        type="range"
        min="0"
        max="3"
        step="1"
        value={formData.techAlternativeMethodSlider || 0}
        onChange={(e) =>
          handleSliderChange("techAlternativeMethodSlider", e.target.value)
        }
        style={{ width: "100%" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Not at all</span>
        <span>A little</span>
        <span>Quite a bit</span>
        <span>Yes, loads!</span>
      </div>
    </div>
  );
}

export default SubStep1Aims;
