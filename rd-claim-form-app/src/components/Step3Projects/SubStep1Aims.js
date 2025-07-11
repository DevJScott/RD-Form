import React from "react";

function SubStep1Aims({ formData, onChange }) {
  const handleCheckbox = (group, option) => {
    const current = formData[group] || [];
    if (current.includes(option)) {
      onChange(group, current.filter((item) => item !== option));
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

  return (
    <div>
      <h3>Project Aims</h3>
      <p>
        Now that we’ve covered off the basics, we need you to tell us about the
        work that {formData.companyName || "the company"} did between{" "}
        <strong>01 October 2023 and 30 September 2024</strong>.
      </p>

      <p>
        To qualify for R&D tax relief, you must demonstrate that:
        <ul>
          <li>There was at least one technical goal</li>
          <li>There was at least one significant technological or scientific difficulty</li>
          <li>People with appropriate skills and experience worked to overcome it</li>
        </ul>
      </p>

      <hr />

      {/* Objective Groups */}
      {[
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
      ].map(({ title, key, options, otherField }) => (
        <div key={key}>
          <h4>{title}</h4>
          {options.map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={(formData[key] || []).includes(item)}
                onChange={() => handleCheckbox(key, item)}
              />{" "}
              {item}
            </label>
          ))}
          <br />
          <label>
            Other:{" "}
            <input
              type="text"
              value={formData[otherField] || ""}
              onChange={(e) => handleTextChange(otherField, e.target.value)}
              style={{ width: "100%" }}
            />
          </label>
          <hr />
        </div>
      ))}

      {/* ✅ Eligibility Message */}
      <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
        {[
          ...(formData.productObjectives || []),
          ...(formData.processObjectives || []),
          ...(formData.scaleObjectives || []),
          ...(formData.marketObjectives || []),
          ...(formData.competitionObjectives || []),
          ...(formData.financeObjectives || []),
        ].length > 0 ? (
          <p>
            ✅ Based on the project aims selected, the work PLAYCRAFT LTD carried out between{" "}
            <strong>01 October 2023 and 30 September 2024</strong> may be eligible for R&D tax relief.
            The activities align with HMRC’s expectations for commercial and technical advancement.
          </p>
        ) : (
          <p style={{ color: "red" }}>
            ⚠️ You haven’t selected any project aims yet. Without a clear commercial or technical goal,
            the project may not be eligible for R&D tax relief under HMRC guidance.
          </p>
        )}
      </div>

      {/* 🔬 Sliders Start After Eligibility Message */}
{/* 🔬 Sliders Start After Eligibility Message */}
<hr />
<h4>Technical Goal — Generating New Knowledge</h4>
<p><strong>a)</strong> Generating new technical knowledge, usually without using it within a practical application.</p>
<p style={{ fontStyle: "italic", color: "#555" }}>
  Speculative research conducted in labs or by academic partnerships, not directly applied in the market.
</p>
<input
  type="range"
  min="0"
  max="3"
  step="1"
  value={formData.techKnowledgeSlider || 0}
  onChange={(e) => handleSliderChange("techKnowledgeSlider", e.target.value)}
  style={{ width: "100%" }}
/>
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9em", marginTop: "5px" }}>
  <span>Not at all</span>
  <span>A little</span>
  <span>Quite a bit</span>
  <span>Yes, loads!</span>
</div>

<hr />
<h4>Technical Goal — Early Stage Commercialisation</h4>
<p><strong>b)</strong> Taking something that may have started with ‘blue sky’ or pure research, and finding a practical application for it.</p>
<p style={{ fontStyle: "italic", color: "#555" }}>
  Typically seen in R&D departments, university spinouts, or grant-supported tech startups exploring application areas.
</p>
<input
  type="range"
  min="0"
  max="3"
  step="1"
  value={formData.earlyCommercialSlider || 0}
  onChange={(e) => handleSliderChange("earlyCommercialSlider", e.target.value)}
  style={{ width: "100%" }}
/>
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9em", marginTop: "5px" }}>
  <span>Not at all</span>
  <span>A little</span>
  <span>Quite a bit</span>
  <span>Yes, loads!</span>
</div>
<hr />
<h4>Technical Goal — Measurable Improvements to Existing Tech</h4>
<p><strong>c)</strong> Taking something that already exists, and through technological changes, making it better in a measurable and objective way.</p>
<p style={{ fontStyle: "italic", color: "#555" }}>
  Typically seen in companies refining existing products to stay competitive, comply with regulations, or meet emerging customer demands.
</p>
<input
  type="range"
  min="0"
  max="3"
  step="1"
  value={formData.techImprovementSlider || 0}
  onChange={(e) => handleSliderChange("techImprovementSlider", e.target.value)}
  style={{ width: "100%" }}
/>
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9em", marginTop: "5px" }}>
  <span>Not at all</span>
  <span>A little</span>
  <span>Quite a bit</span>
  <span>Yes, loads!</span>
</div>

<hr />
<h4>Technical Goal — Alternative Ways to Achieve the Same Outcome</h4>
<p><strong>d)</strong> Taking something that already exists, and finding a new and better way to achieve the same performance.</p>
<p style={{ fontStyle: "italic", color: "#555" }}>
  Common in cost-driven or regulation-driven R&D where companies explore novel approaches to maintain performance more efficiently or affordably.
</p>
<input
  type="range"
  min="0"
  max="3"
  step="1"
  value={formData.techAlternativeMethodSlider || 0}
  onChange={(e) => handleSliderChange("techAlternativeMethodSlider", e.target.value)}
  style={{ width: "100%" }}
/>
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9em", marginTop: "5px" }}>
  <span>Not at all</span>
  <span>A little</span>
  <span>Quite a bit</span>
  <span>Yes, loads!</span>
</div>

</div>
  );
}

export default SubStep1Aims;
