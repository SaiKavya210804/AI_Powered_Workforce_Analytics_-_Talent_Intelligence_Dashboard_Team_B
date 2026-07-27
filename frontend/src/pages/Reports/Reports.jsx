import { useState } from "react";
import ReportCard from "../../components/reports/ReportCard";
import "./Reports.css";

import { getEmployees } from "../../services/employeeService";
import { exportEmployeesToPDF } from "../../utils/pdfExport";
import { exportEmployeesToExcel } from "../../utils/excelExport";

function Reports() {

  const [generatedReport, setGeneratedReport] = useState(null);
  const [employees, setEmployees] = useState([]);

  // ===========================
  // Generate Report
  // ===========================

  const handleGenerate = async (title) => {

    try {

      const response = await getEmployees(1, 10000);

      // depending on API response format
      const employeeData =
        response.employees ||
        response.data ||
        response;

      setEmployees(employeeData);

      let reportContent = "";

      switch (title) {

        case "Workforce Summary Report":

          reportContent = `
Total Employees : ${employeeData.length}

Departments :
${[...new Set(employeeData.map(emp => emp.Department))].join(", ")}

Average Age :
${(
employeeData.reduce((sum, emp) => sum + emp.Age, 0)
/ employeeData.length
).toFixed(1)}

Average Salary :
$${(
employeeData.reduce((sum, emp) => sum + emp.MonthlyIncome, 0)
/ employeeData.length
).toFixed(0)}

Attrition Count :
${employeeData.filter(emp => emp.Attrition === "Yes").length}
`;

          break;

        case "Employee Report":

          reportContent =
`Employee report generated successfully.

Total Employees : ${employeeData.length}

You can now download
the report as PDF or Excel.`;

          break;

        case "Analytics Report":

          reportContent =
`Analytics generated successfully.

Employees : ${employeeData.length}

Analytics data is ready
for export.`;

          break;

        case "Department Report":

          reportContent =
`Departments Available :

${[...new Set(employeeData.map(emp => emp.Department))].join("\n")}

Department report generated successfully.`;

          break;

        default:

          reportContent = "Report generated.";

      }

      setGeneratedReport({

        title,

        content: reportContent,

      });

    }

    catch (error) {

      console.error(error);

      alert("Unable to generate report.");

    }

  };

  // ===========================
  // PDF
  // ===========================

  const handlePDF = () => {

    if (employees.length === 0) {

      alert("Generate a report first.");

      return;

    }

    exportEmployeesToPDF(employees);

  };

  // ===========================
  // Excel
  // ===========================

  const handleExcel = () => {

    if (employees.length === 0) {

      alert("Generate a report first.");

      return;

    }

    exportEmployeesToExcel(employees);

  };

  return (

    <div className="reports-container">

      <h1 className="reports-title">

        Reports

      </h1>

      <p className="reports-subtitle">

        Generate and download workforce reports.

      </p>

      <div className="report-grid">

        <ReportCard

          title="Workforce Summary Report"

          description="Generate a summary of workforce insights."

          onGenerate={handleGenerate}

          onPDF={handlePDF}

          onExcel={handleExcel}

        />

        <ReportCard

          title="Employee Report"

          description="Export employee information."

          onGenerate={handleGenerate}

          onPDF={handlePDF}

          onExcel={handleExcel}

        />

        <ReportCard

          title="Analytics Report"

          description="Download workforce analytics."

          onGenerate={handleGenerate}

          onPDF={handlePDF}

          onExcel={handleExcel}

        />

        <ReportCard

          title="Department Report"

          description="Generate department-wise workforce reports."

          onGenerate={handleGenerate}

          onPDF={handlePDF}

          onExcel={handleExcel}

        />

      </div>

      {

      generatedReport && (

        <div

          style={{

            marginTop:40,

            padding:20,

            background:"#fff",

            borderRadius:10,

            boxShadow:"0 2px 8px rgba(0,0,0,.1)"

          }}

        >

          <h2>{generatedReport.title}</h2>

          <pre

            style={{

              whiteSpace:"pre-wrap",

              fontSize:15

            }}

          >

            {generatedReport.content}

          </pre>

        </div>

      )}

    </div>

  );

}

export default Reports;