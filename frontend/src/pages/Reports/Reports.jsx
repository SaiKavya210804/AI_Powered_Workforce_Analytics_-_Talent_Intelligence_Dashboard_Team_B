import { useState } from "react";

import ReportCard from "../../components/reports/ReportCard";
import "./Reports.css";

import { exportFilteredEmployees } from "../../services/employeeService";
import { exportEmployeesToPDF } from "../../utils/pdfExport";
import { exportEmployeesToExcel } from "../../utils/excelExport";


function Reports() {

  const [generatedReport, setGeneratedReport] = useState(null);
  const [employees, setEmployees] = useState([]);



  // ============================
  // Generate Report
  // ============================

  const handleGenerate = async (title) => {

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

        alert(
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



      let reportContent = "";



      switch(title){


        case "Workforce Summary Report":

          reportContent = `

Total Employees : ${totalEmployees}

Departments :
${departments.join(", ")}

Average Age : ${averageAge}

Average Salary : $${averageSalary}

Attrition Count : ${attritionCount}

Filters Applied:

Search : ${filters.search || "All"}

Department : ${filters.department || "All"}

Job Role : ${filters.jobRole || "All"}

Attrition : ${filters.attrition || "All"}

`;

        break;




        case "Employee Report":

          reportContent = `

Employee Report

Total Employees Exported :
${totalEmployees}


Filters Applied:

Search :
${filters.search || "All"}


Department :
${filters.department || "All"}


Job Role :
${filters.jobRole || "All"}


Attrition :
${filters.attrition || "All"}

`;

        break;




        case "Analytics Report":

          reportContent = `

Analytics Report

Employees Analysed :
${totalEmployees}


Average Age :
${averageAge}


Average Salary :
$${averageSalary}


Attrition Employees :
${attritionCount}

`;

        break;




        case "Department Report":

          reportContent = `

Department Report


Departments:

${departments.join("\n")}


Total Employees :
${totalEmployees}

`;

        break;




        default:

          reportContent =
          "Report generated successfully.";

      }




      setGeneratedReport({

        title,

        content: reportContent

      });



    }
    catch(error){


      console.error(
        "Report Error:",
        error
      );


      alert(
        "Unable to generate report."
      );


    }

  };





  // ============================
  // PDF Export
  // ============================

  const handlePDF = () => {


    if(employees.length === 0){

      alert(
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

      alert(
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




      <div className="report-grid">


        <ReportCard

          title="Workforce Summary Report"

          description="Generate workforce summary."

          onGenerate={handleGenerate}

          onPDF={handlePDF}

          onExcel={handleExcel}

        />



        <ReportCard

          title="Employee Report"

          description="Export filtered employees."

          onGenerate={handleGenerate}

          onPDF={handlePDF}

          onExcel={handleExcel}

        />



        <ReportCard

          title="Analytics Report"

          description="Generate analytics report."

          onGenerate={handleGenerate}

          onPDF={handlePDF}

          onExcel={handleExcel}

        />



        <ReportCard

          title="Department Report"

          description="Generate department report."

          onGenerate={handleGenerate}

          onPDF={handlePDF}

          onExcel={handleExcel}

        />


      </div>





      {
        generatedReport &&

        <div className="generated-report">


          <h2>
            {generatedReport.title}
          </h2>



          <pre>

            {generatedReport.content}

          </pre>


        </div>

      }



    </div>

  );

}


export default Reports;