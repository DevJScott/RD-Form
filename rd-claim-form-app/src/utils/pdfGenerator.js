import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Optional: replace with your actual logo path or base64 string
const LOGO_URL = "/assets/branding/logo.png"; // Relative to public folder

const generateNarrativePDF = async (formData) => {
  const doc = new jsPDF();
  let pageHeight = doc.internal.pageSize.height;
  let y = 20;

  // Load logo image
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

  // Title
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text(`${formData.companyName || "Company"} – R&D Tax Relief Report`, 60, y);
  y += 10;

  doc.setFontSize(11);
  doc.setFont(undefined, "normal");
  doc.text(`Claim Period: ${formData.claimStartDate || "—"} to ${formData.claimEndDate || "—"}`, 10, y);
  y += 10;

  // Helper: Add page number
  const addFooter = () => {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${pageCount}`, 180, pageHeight - 10);
    }
  };

  // === Section 1: Overview ===
  doc.setFont(undefined, "bold");
  doc.text("1. Company Overview", 10, y);
  y += 8;
  doc.setFont(undefined, "normal");
  doc.text(doc.splitTextToSize(
    `${formData.companyName} is an SME in the ${formData.industry || "—"} industry, employing ${formData.staffCount || "—"} staff. The company ${
      formData.paysCorpTax ? "is" : "is not"
    } subject to Corporation Tax, and ${
      formData.hasClaimedBefore ? "has previously claimed" : "has not claimed"
    } R&D tax relief.`,
    190
  ), 10, y);
  y += 20;

  // === Section 2: Project Details (supporting multiple projects) ===
  const projects = formData.projectTitles?.length ? formData.projectTitles : ["Unnamed Project"];
  projects.forEach((title, i) => {
    doc.setFont(undefined, "bold");
    doc.text(`2.${i + 1} Project: ${title}`, 10, y);
    y += 8;
    doc.setFont(undefined, "normal");

    const aims = formData.projectAims instanceof Array ? formData.projectAims[i] : formData.projectAims;
    const challenges = formData.technologicalChallenges instanceof Array ? formData.technologicalChallenges[i] : formData.technologicalChallenges;
    const outputs = formData.projectOutputs instanceof Array ? formData.projectOutputs[i] : formData.projectOutputs;

    doc.text(doc.splitTextToSize(
      `The company aimed to: ${aims || "—"}.\n\nKey technological challenges: ${challenges || "—"}.\n\nExpected outputs: ${outputs || "—"}.`,
      190
    ), 10, y);
    y += 30;
  });

  // === Section 3: Technical Narrative ===
  doc.setFont(undefined, "bold");
  doc.text("3. Technical Narrative", 10, y);
  y += 8;
  doc.setFont(undefined, "normal");
  doc.text(doc.splitTextToSize(
    `Technological uncertainties involved: ${formData.technologicaluncertainties || "—"}.\n\nThese were resolved by ${
      formData.technicalLead || "—"
    }, working in the field of ${formData.scienceField || formData.technicalField || "—"}.\n\nResolution activities included: ${
      formData.technicalresolutions || "—"
    }. Evidence retained: ${formData.documentationEvidence || "—"}.`,
    190
  ), 10, y);
  y += 35;

  // === Section 4: Expenditure Summary ===
  doc.setFont(undefined, "bold");
  doc.text("4. Expenditure Summary", 10, y);
  y += 8;

  autoTable(doc, {
    startY: y,
    styles: { fontSize: 10 },
    head: [["Cost Category", "Amount (£)"]],
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

  // === Section 5: Declaration ===
  doc.setFont(undefined, "bold");
  doc.text("5. Declaration", 10, y);
  y += 8;
  doc.setFont(undefined, "normal");
  doc.text(doc.splitTextToSize(
    "I confirm that the information provided in this report is accurate and complete to the best of my knowledge and is submitted for the purposes of claiming R&D Tax Relief.",
    190
  ), 10, y);

  // Add page numbers
  addFooter();

  // Save
  doc.save("rd-tax-relief-report.pdf");
};

export { generateNarrativePDF };
