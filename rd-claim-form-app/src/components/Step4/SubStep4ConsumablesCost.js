import React from "react";

function SubStep4ConsumablesCost({ formData, onChange }) {
  const {
    rawMaterialCost = "",
    heatLightPaymentType = "",
    heatLightTotalCost = "",
    useDefaultHeatLightSplit = true,
    heatLightProjectSplit = "21.66",
  } = formData;

  const companyName = formData.companyName || "the company";

  const handleChange = (field) => (e) => {
    onChange(field, e.target.value);
  };

  const handleRadioChange = (e) => {
    onChange("useDefaultHeatLightSplit", e.target.value === "default");
  };

  return (
    <div>
      <h3>Consumables Cost</h3>

      <p><strong>Raw Materials</strong></p>
      <p>
        {companyName} can claim for the cost of materials that have been used in its R&D.
      </p>
      <label>Total raw material expenditure (£):</label>
      <input
        type="number"
        min="0"
        value={rawMaterialCost}
        onChange={handleChange("rawMaterialCost")}
        style={{ width: "100%" }}
      />

      <hr />

      <p><strong>Heat and Light</strong></p>
      <p>
        In addition to raw materials, the heat and light costs associated with R&D can be included in the claim.
        Some companies are charged separately for these, while others pay for them as part of their rent.
      </p>

      <label>How did {companyName} pay for heat and light?</label>
      <div>
        <label>
          <input
            type="radio"
            name="heatLightPaymentType"
            value="included"
            checked={heatLightPaymentType === "included"}
            onChange={handleChange("heatLightPaymentType")}
          />
          Included within rent
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="heatLightPaymentType"
            value="separate"
            checked={heatLightPaymentType === "separate"}
            onChange={handleChange("heatLightPaymentType")}
          />
          Charged separately from rent
        </label>
      </div>

      {heatLightPaymentType === "separate" && (
        <>
          <br />
          <label>Total heat and light cost during claim (£):</label>
          <input
            type="number"
            min="0"
            value={heatLightTotalCost}
            onChange={handleChange("heatLightTotalCost")}
            style={{ width: "100%" }}
          />

          <hr />

          <h4>Apportioning Heat & Light Costs to R&D Projects</h4>
          <p>
            {companyName} spent £{heatLightTotalCost || "0"} on heat and light during the claim period.
            What percentage of this spend relates to the R&D project?
          </p>

          <label>
            <input
              type="radio"
              value="default"
              checked={useDefaultHeatLightSplit}
              onChange={handleRadioChange}
            />
            Use default (based on staff time): <strong>21.66%</strong>
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="custom"
              checked={!useDefaultHeatLightSplit}
              onChange={handleRadioChange}
            />
            Use custom value
          </label>

          {!useDefaultHeatLightSplit && (
            <div style={{ marginTop: "10px" }}>
              <label>
                % of heat & light attributed to project:
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={heatLightProjectSplit}
                onChange={handleChange("heatLightProjectSplit")}
                style={{ width: "100px" }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SubStep4ConsumablesCost;
