import { useState } from "react";
import ReportCard from "../../components/reports/ReportCard";
import "./Reports.css";

function Reports() {

  const [generatedReport, setGeneratedReport] = useState(null);

  const handleGenerate = (title) => {

    let content = "";

    switch (title) {

      case "Workforce Summary Report":
        content = `
Total Employees : 10,000
Departments : 3
Average Age : 37.1 Years
Average Income : $6,596
Attrition Rate : 15.6%
        `;
        break;

      case "Employee Report":
        content = `
Employee data report generated successfully.

Includes:
• Employee Details
• Department
• Salary
• Performance
        `;
        break;

      case "Analytics Report":
        content = `
Analytics Report

• Workforce Trends
• Hiring Trends
• Attrition Analysis
• Performance Metrics
        `;
        break;

      case "Department Report":
        content = `
Department Report

• HR
• Sales
• Research & Development

Department-wise employee statistics generated.
        `;
        break;

      default:
        content = "No report available.";
    }

    setGeneratedReport({
      title,
      content,
    });

  };

  const handlePDF = (title) => {
    alert(`PDF download for "${title}" will be added next.`);
  };

  const handleExcel = (title) => {
    alert(`Excel download for "${title}" will be added next.`);
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

      {generatedReport && (

        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >

          <h2>{generatedReport.title}</h2>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "15px"
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