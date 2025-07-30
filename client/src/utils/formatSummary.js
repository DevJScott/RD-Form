export const formatSummaryText = (formData) => {
  return `
🔹 Company Name: ${formData.companyName}
🔹 Claim Period: ${formData.claimStartDate} to ${formData.claimEndDate}
🔹 Has claimed before: ${formData.hasClaimedBefore}
🔹 Notified HMRC: ${formData.hasNotifiedHMRC}

--- Projects ---
🧠 Project Aims: ${formData.projectAims}
💡 Technical Challenges: ${formData.technologicalChallenges}
🛠️ Advance Claimed: ${formData.technologicaladvance}
📈 Output: ${formData.projectOutputs}

--- Financial Summary ---
💰 R&D Salary: £${formData.rdSalaryPortion}
💰 Employer NIC: £${formData.employerNIC}
💰 Subcontractors: £${formData.subcontractorCost}
💻 Software Costs: £${formData.softwareTotal}
🔥 Heat/Light: £${formData.heatLightTotalCost}

--- Declaration ---
✅ Submitted as a complete and accurate record for R&D Tax Relief.
  `;
};
