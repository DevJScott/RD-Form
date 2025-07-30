// utils/pdfGenerator.js

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

  // Section 1: Company Overview
  doc.setFont(undefined, "bold");
  doc.text("1. Company Overview", 10, y);
  y += 8;
  doc.setFont(undefined, "normal");
  doc.text(doc.splitTextToSize(
    `${formData.companyName} operates in the ${formData.industry || "—"} sector. It has ${formData.staffCount || "—"} staff and ${
      formData.paysCorpTax ? "is" : "is not"
    } subject to Corporation Tax. It ${formData.hasClaimedBefore ? "has" : "has not"} previously claimed R&D relief.`,
    190
  ), 10, y);
  y += 20;

  // Section 2: Projects
  const projects = formData.projectTitles?.length ? formData.projectTitles : ["Unnamed Project"];
  projects.forEach((title, i) => {
    doc.setFont(undefined, "bold");
    doc.text(`2.${i + 1} Project: ${title}`, 10, y);
    y += 8;
    doc.setFont(undefined, "normal");

    const aims = Array.isArray(formData.projectAims) ? formData.projectAims[i] : formData.projectAims;
    const challenges = Array.isArray(formData.technologicalChallenges) ? formData.technologicalChallenges[i] : formData.technologicalChallenges;
    const outputs = Array.isArray(formData.projectOutputs) ? formData.projectOutputs[i] : formData.projectOutputs;

    doc.text(doc.splitTextToSize(
      `Objectives: ${aims || "—"}
Technical Challenges: ${challenges || "—"}
Expected Outputs: ${outputs || "—"}

This aligns with HMRC's guidance CIRD81910 §§9a–9d.`,
      190
    ), 10, y);
    y += 35;
  });

  // Section 3: Technical Narrative
  doc.setFont(undefined, "bold");
  doc.text("3. Technical Narrative", 10, y);
  y += 8;
  doc.setFont(undefined, "normal");
  doc.text(doc.splitTextToSize(
    `Uncertainties (CIRD81910 §§12–13): ${formData.technologicaluncertainties || "—"}

Resolution led by ${formData.technicalLead || "—"}, an experienced professional in ${
      formData.scienceField || formData.technicalField || "—"
    }. Methods: ${formData.technicalresolutions || "—"}.`,
    190
  ), 10, y);
  y += 35;

  // Section 4: Cost Summary
  doc.setFont(undefined, "bold");
  doc.text("4. Expenditure Summary", 10, y);
  y += 8;

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
  y = doc.previousAutoTable?.finalY + 10 || y + 40;

  // Section 5: Scheme Breakdown
  doc.setFont(undefined, "bold");
  doc.text("5. Scheme Breakdown", 10, y);
  y += 8;

  autoTable(doc, {
    startY: y,
    styles: { fontSize: 10 },
    head: [["Scheme", "Amount (£)"]],
    body: [
      ["SME", formData.totalSMEExpenditure || "—"],
      ["RDEC", formData.totalRDECExpenditure || "—"],
      ["Total", formData.totalClaimExpenditure || "—"],
    ],
  });
  y = doc.previousAutoTable?.finalY + 10 || y + 30;

  // Section 6: Recordkeeping & Declaration
  doc.setFont(undefined, "bold");
  doc.text("6. Recordkeeping & Declaration", 10, y);
  y += 8;
  doc.setFont(undefined, "normal");
  doc.text(doc.splitTextToSize(
    `The company has retained evidence including sprint logs, feasibility reports, emails, design files, and internal documentation.

I confirm the information above is accurate and complete.`,
    190
  ), 10, y);
  y += 20;

  doc.text("Signature: ____________________", 10, y);
  doc.text("Date: ____________________", 140, y);

  addFooter();
  doc.save("rd-tax-relief-report.pdf");
};
