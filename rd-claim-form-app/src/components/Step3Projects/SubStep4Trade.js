function SubStep4Trade({ formData, onChange }) {
  return (
    <div>
      <h3>Trade</h3>
      
      <textarea
        value={formData.subStep4Trade || ""}
        onChange={(e) => onChange("subStep4Trade", e.target.value)}
        rows={5}
        style={{ width: "100%" }}
      />

      <hr style={{ margin: "20px 0" }} />

      <p>
        HMRC will only support claims for R&D that is relevant to the claimant company.
        This means the work claimed for has to be related to <strong>{formData.companyName || "PLAYCRAFT LTD"}</strong>'s trade or industry.
      </p>
      <p>Please select the option that best fits the R&D work:</p>

      <label style={{ display: "block", marginBottom: "8px" }}>
        <input
          type="radio"
          name="tradeConnection"
          value="current"
          checked={formData.tradeConnection === "current"}
          onChange={(e) => onChange("tradeConnection", e.target.value)}
        />{" "}
        It was related to the company’s current trade
      </label>

      <label style={{ display: "block", marginBottom: "8px" }}>
        <input
          type="radio"
          name="tradeConnection"
          value="future"
          checked={formData.tradeConnection === "future"}
          onChange={(e) => onChange("tradeConnection", e.target.value)}
        />{" "}
        It was related to trade the company may conduct in the future
      </label>

      <label style={{ display: "block", marginBottom: "8px" }}>
        <input
          type="radio"
          name="tradeConnection"
          value="none"
          checked={formData.tradeConnection === "none"}
          onChange={(e) => onChange("tradeConnection", e.target.value)}
        />{" "}
        It had no connection to the company's current or future trade
      </label>
    </div>
  );
}

export default SubStep4Trade;
