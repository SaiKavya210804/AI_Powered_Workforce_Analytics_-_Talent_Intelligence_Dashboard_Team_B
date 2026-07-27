import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportEmployeesToPDF = (employees) => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("AI Powered Workforce Analytics", 14, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Employee Report", 14, 24);

  const tableData = employees.map((emp) => [
    emp.EmpID,
    emp.Department,
    emp.JobRole,
    emp.Gender,
    emp.Age,
    emp.MonthlyIncome,
    emp.Attrition,
  ]);

  autoTable(doc, {
    startY: 32,
    head: [[
      "Emp ID",
      "Department",
      "Job Role",
      "Gender",
      "Age",
      "Salary",
      "Attrition",
    ]],
    body: tableData,
    styles: {
      fontSize: 9,
    },
    headStyles: {
      fillColor: [41, 128, 185],
    },
  });

  doc.save("Employee_Report.pdf");
};