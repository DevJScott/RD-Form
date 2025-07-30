export function determineRDScheme(formData) {
  const totalStaff =
    Number(formData.directorCount || 0) + Number(formData.staffCount || 0);
  const partOfGroup = formData.partOfGroup === "Yes";
  const hasConnectedCompanies = formData.hasConnectedCompanies === "Yes";
  const receivedGrants = formData.stateAidGrants === "Yes" || formData.nonStateAidGrants === "Yes";
  const actedAsSubcontractor = formData.actedAsSubcontractor === "rdInvolved";

  const isSME = totalStaff < 500 && !partOfGroup && !hasConnectedCompanies;

  if (!isSME || receivedGrants || actedAsSubcontractor) {
    return "RDEC";
  }

  return "SME";
}
