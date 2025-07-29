// src/hooks/useStepValidation.js
export function useStepValidation(step, formData) {
  const errors = {};

  switch (step) {
    case 1:
      if (!formData.isLimitedCompany) errors.isLimitedCompany = "Required";
      if (!formData.paysCorpTax) errors.paysCorpTax = "Required";
      if (!formData.claimStartDate) errors.claimStartDate = "Start date required";
      if (!formData.claimEndDate) errors.claimEndDate = "End date required";

      if (
        formData.claimStartDate &&
        formData.claimEndDate &&
        new Date(formData.claimEndDate) < new Date(formData.claimStartDate)
      ) {
        errors.claimEndDate = "End date must be after start date";
      }
      break;

    case 4: // Costs
      if (formData.totalStaffCost < 0) errors.totalStaffCost = "Must be a positive number";
      if (isNaN(formData.totalStaffCost)) errors.totalStaffCost = "Must be a number";
      // Add more cost validations
      break;

    default:
      break;
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
