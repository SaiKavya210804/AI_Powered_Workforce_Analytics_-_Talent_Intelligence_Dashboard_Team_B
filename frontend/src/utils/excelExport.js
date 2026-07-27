import * as XLSX from "xlsx";

export const exportEmployeesToExcel = (employees) => {
  const data = employees.map((emp) => ({
    "Employee ID": emp.EmpID,
    Department: emp.Department,
    "Job Role": emp.JobRole,
    Gender: emp.Gender,
    Age: emp.Age,
    Salary: emp.MonthlyIncome,
    Attrition: emp.Attrition,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Employees"
  );

  XLSX.writeFile(workbook, "Employee_Report.xlsx");
};