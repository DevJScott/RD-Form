import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const LOGO_URL = "/assets/branding/logo-dark-bg.png";

export const generateNarrativePDF = async (formData) => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  let y = 20;

  // Load logo
  const loadImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.src = src;
    });

  const logo = await loadImage(LOGO_URL);
  doc.addImage(logo, "PNG", 10, 10, 40, 15);
  y = 30;

  // Header
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text(`${formData.companyName || "Company"} – R&D Tax Relief Report`, 60, y);
  y += 10;
  doc.setFontSize(11);
  doc.setFont(undefined, "normal");
  doc.text(`Claim Period: ${formData.claimStartDate || "—"} to ${formData.claimEndDate || "—"}`, 10, y);
  y += 10;

  const addFooter = () => {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${pageCount}`, 180, pageHeight - 10);
    }
  };

  // Section 1: Overview
  doc.setFont(undefined, "bold");
  doc.text("1. Company Overview", 10, y); y += 8;
  doc.setFont(undefined, "normal");
  doc.text(doc.splitTextToSize(
    `${formData.companyName} is an SME operating in the ${formData.industry || "—"} sector. It employs ${
      formData.staffCount || "—"
    } staff and ${
      formData.paysCorpTax ? "is" : "is not"
    } subject to Corporation Tax. The company ${
      formData.hasClaimedBefore ? "has previously claimed" : "has not claimed"
    } R&D relief from HMRC.`,
    190
  ), 10, y); y += 20;

  // Section 2: Projects
  const projects = formData.projectTitles?.length ? formData.projectTitles : ["Unnamed Project"];
  projects.forEach((title, i) => {
    doc.setFont(undefined, "bold");
    doc.text(`2.${i + 1} Project: ${title}`, 10, y); y += 8;
    doc.setFont(undefined, "normal");

    const aims = Array.isArray(formData.projectAims) ? formData.projectAims[i] : formData.projectAims;
    const challenges = Array.isArray(formData.technologicalChallenges) ? formData.technologicalChallenges[i] : formData.technologicalChallenges;
    const outputs = Array.isArray(formData.projectOutputs) ? formData.projectOutputs[i] : formData.projectOutputs;

    doc.text(doc.splitTextToSize(
      `The company aimed to: ${aims || "—"}.\n\nTechnical challenges included: ${challenges || "—"}.\n\nExpected outputs: ${outputs || "—"}.\n\nThis work aligns with the definition of R&D under HMRC’s CIRD81910, paragraphs 9a–9d.`,
      190
    ), 10, y); y += 35;
  });

  // Section 3: Technical Narrative
  doc.setFont(undefined, "bold");
  doc.text("3. Technical Narrative", 10, y); y += 8;
  doc.setFont(undefined, "normal");
  doc.text(doc.splitTextToSize(
    `The company addressed technological uncertainties that could not be resolved using publicly available knowledge. These uncertainties included: ${
      formData.technologicaluncertainties || "—"
    }.\n\nResolution work was led by ${formData.technicalLead || "—"}, a competent professional in ${
      formData.scienceField || formData.technicalField || "—"
    }, and included: ${formData.technicalresolutions || "—"}.`,
    190
  ), 10, y); y += 35;

  // Section 4: Competent Professional
  doc.setFont(undefined, "bold");
  doc.text("4. Competent Professional", 10, y); y += 8;
  doc.setFont(undefined, "normal");
  doc.text(doc.splitTextToSize(
    `${formData.technicalLead || "—"} is identified as the competent professional on this project, with significant experience in the field of ${formData.scienceField || formData.technicalField || "—"}.`,
    190
  ), 10, y); y += 20;

  // Section 5: Expenditure
  doc.setFont(undefined, "bold");
  doc.text("5. Expenditure Summary", 10, y); y += 8;
  autoTable(doc, {
    startY: y,
    styles: { fontSize: 10 },
    head: [["Category", "Amount (£)"]],
    body: [
      ["Staff Cost", formData.totalStaffCost || "—"],
      ["Software", formData.softwareTotal || "—"],
      ["Volunteers", formData.volunteerCost || "—"],
      ["Raw Materials", formData.rawMaterialCost || "—"],
      ["Heat & Light", formData.heatLightTotalCost || "—"],
      ["EPWs", formData.epwCost || "—"],
      ["Subcontractors", formData.subcontractorCost || "—"],
    ],
  });
  y = doc.previousAutoTable.finalY + 10;

  // Section 6: Indirect Activities
  doc.setFont(undefined, "bold");
  doc.text("6. Indirect R&D Activities", 10, y); y += 8;
  doc.setFont(undefined, "normal");
  doc.text(doc.splitTextToSize(
    `Approximately 5–10% of qualifying time was spent on indirect activities, including technical meetings, feasibility assessments, design iteration planning, and documentation work.`,
    190
  ), 10, y); y += 20;

  // Section 7: Grants & Subcontractors
  doc.setFont(undefined, "bold");
  doc.text("7. Grants and Subcontracting", 10, y); y += 8;
  doc.setFont(undefined, "normal");
  doc.text(doc.splitTextToSize(
    `No grant funding or subcontracted R&D activities were used during the claim period. All work was carried out in-house.`,
    190
  ), 10, y); y += 20;

  // Section 8: Recordkeeping
  doc.setFont(undefined, "bold");
  doc.text("8. Recordkeeping", 10, y); y += 8;
  doc.setFont(undefined, "normal");
  doc.text(doc.splitTextToSize(
    `Records have been retained to evidence the R&D work, including sprint logs, internal communications, design iterations, testing results, and research documentation.`,
    190
  ), 10, y); y += 20;

  // Section 9: Declaration
  doc.setFont(undefined, "bold");
  doc.text("9. Declaration", 10, y); y += 8;
  doc.setFont(undefined, "normal");
  doc.text(doc.splitTextToSize(
    `I confirm the above information is accurate and complete, and that the activities described align with HMRC’s definition of R&D under CIRD81900 and CIRD81910.`,
    190
  ), 10, y);

  addFooter();
  doc.save("rd-tax-relief-report.pdf");
};
