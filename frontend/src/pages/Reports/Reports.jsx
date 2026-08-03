import { useState } from "react";

import ReportCard from "../../components/reports/ReportCard";
import "./Reports.css";

import { exportFilteredEmployees } from "../../services/employeeService";
import { exportEmployeesToPDF } from "../../utils/pdfExport";
import { exportEmployeesToExcel } from "../../utils/excelExport";
import { Snackbar, Alert } from "@mui/material";


function Reports() {

  const [generatedReport, setGeneratedReport] = useState(null);
  const [employees, setEmployees] = useState([]);
  const reportGenerated = employees.length > 0;
const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success",
});

const showSnackbar = (message, severity = "success") => {
    console.log("Snackbar:", message);
  setSnackbar({
    open: true,
    message,
    severity,
  });
};
const [loading, setLoading] = useState(false);


  // ============================
  // Generate Report
  // ============================

  const handleGenerate = async (title) => {
    setLoading(true);



    try {


      const filters =
        JSON.parse(
          localStorage.getItem("employeeFilters")
        ) || {};



      console.log(
        "Reports Filters:",
        filters
      );



      const response =
        await exportFilteredEmployees(
          filters.search || "",
          filters.department || "",
          filters.jobRole || "",
          filters.attrition || ""
        );



      const employeeData =
        response.employees || [];



      if(employeeData.length === 0){

        showSnackbar(
          "No employees found for selected filters."
        );

        return;

      }



      setEmployees(employeeData);
      



      const totalEmployees =
        employeeData.length;



      const averageAge =
        (
          employeeData.reduce(
            (sum, emp) =>
              sum + Number(emp.Age || 0),
            0
          )
          /
          totalEmployees
        ).toFixed(1);



      const averageSalary =
        (
          employeeData.reduce(
            (sum, emp) =>
              sum + Number(emp.MonthlyIncome || 0),
            0
          )
          /
          totalEmployees
        ).toFixed(0);



      const attritionCount =
        employeeData.filter(
          emp =>
          emp.Attrition === "Yes"
        ).length;



      const departments =
        [
          ...new Set(
            employeeData.map(
              emp => emp.Department
            )
          )
        ];
        



      




      setGeneratedReport({
  title,
  generatedOn: new Date().toLocaleString(),

  totalEmployees,
  averageAge,
  averageSalary,
  attritionCount,
  departments,

  filters,
});
      showSnackbar(
  "Report generated successfully!",
  "success"
);



    }
    catch (error) {
  console.error("Report Error:", error);

  if (error.response) {
    console.log(error.response.data);
  }

  showSnackbar("Unable to generate report.", "error");
}
finally {

    setLoading(false);

  }


  };





  // ============================
  // PDF Export
  // ============================

  const handlePDF = () => {


    if(employees.length === 0){

      showSnackbar(
        "Generate report first."
      );

      return;

    }


    exportEmployeesToPDF(
      employees
    );

  };





  // ============================
  // Excel Export
  // ============================

  const handleExcel = () => {


    if(employees.length === 0){

      showSnackbar(
        "Generate report first."
      );

      return;

    }


    exportEmployeesToExcel(
      employees
    );

  };



  return (

    <div className="reports-container">


      <h1 className="reports-title">
        Reports
      </h1>


      <p className="reports-subtitle">
        Generate and download workforce reports.
      </p>
      


      {loading ? (

  <div className="loading-state">
    <h2>Generating Report...</h2>
    <p>Please wait while we prepare your report.</p>
  </div>

) : (

  <div className="report-grid">

    <ReportCard
      title="Workforce Summary Report"
      description="Generate workforce summary."
      onGenerate={handleGenerate}
      onPDF={handlePDF}
      onExcel={handleExcel}
      reportGenerated={reportGenerated}
    />
    <ReportCard
    title="Employee Report"
    description="Export filtered employees."
    onGenerate={handleGenerate}
    onPDF={handlePDF}
    onExcel={handleExcel}
    reportGenerated={reportGenerated}
  />

  <ReportCard
    title="Analytics Report"
    description="Generate analytics report."
    onGenerate={handleGenerate}
    onPDF={handlePDF}
    onExcel={handleExcel}
    reportGenerated={reportGenerated}
  />

  <ReportCard
    title="Department Report"
    description="Generate department report."
    onGenerate={handleGenerate}
    onPDF={handlePDF}
    onExcel={handleExcel}
    reportGenerated={reportGenerated}
  />


    {/* Other ReportCards */}

  </div>

)}


      {generatedReport ? (

  <div className="generated-report">

    <div className="report-header">

      <div>
        <h2>{generatedReport.title}</h2>

        <p className="generated-date">
    Generated on: {generatedReport.generatedOn}
</p>

<p className="generated-count">
    Exported Employees: {generatedReport.totalEmployees}
</p>
      </div>

      <span className="report-status">
        Generated
      </span>

    </div>

    <hr />

    <div className="summary-grid">

      <div className="summary-item">
        <h4>Total Employees</h4>
        <p>{generatedReport.totalEmployees}</p>
      </div>

      <div className="summary-item">
        <h4>Departments</h4>
        <p>{generatedReport.departments.join(", ")}</p>
      </div>

      <div className="summary-item">
        <h4>Average Salary</h4>
        <p>${generatedReport.averageSalary}</p>
      </div>

      <div className="summary-item">
        <h4>Average Age</h4>
        <p>{generatedReport.averageAge}</p>
      </div>

      <div className="summary-item">
        <h4>Attrition</h4>
        <p>{generatedReport.attritionCount}</p>
      </div>

    </div>

    <hr />

    <h3>Applied Filters</h3>

    <div className="filters">

      <span className="filter-chip">
        Search: {generatedReport.filters.search || " All"}
      </span>

      <span className="filter-chip">
        Department: {generatedReport.filters.department || " All"}
      </span>

      <span className="filter-chip">
        Job Role: {generatedReport.filters.jobRole || " All"}
      </span>

      <span className="filter-chip">
        Attrition: {generatedReport.filters.attrition || " All"}
      </span>

    </div>

  </div>

) : (

  <div className="empty-state">

    <h2>No Report Generated</h2>

    <p>
      Select employee filters and click
      <strong> Generate</strong> to create your first report.
    </p>

  </div>

)}
      <Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  onClose={() =>
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }))
  }
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
>
  <Alert
    severity={snackbar.severity}
    variant="filled"
    onClose={() =>
      setSnackbar((prev) => ({
        ...prev,
        open: false,
      }))
    }
  >
    {snackbar.message}
  </Alert>
</Snackbar>
</div>

);

}



    

  



export default Reports;