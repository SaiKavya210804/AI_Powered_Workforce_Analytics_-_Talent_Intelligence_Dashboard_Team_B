import ReportCard from "../../components/reports/ReportCard";
import "./Reports.css";

function Reports() {
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
        />

        <ReportCard
          title="Employee Report"
          description="Export employee information."
        />

        <ReportCard
          title="Analytics Report"
          description="Download workforce analytics."
        />

        <ReportCard
          title="Department Report"
          description="Generate department-wise workforce reports."
        />

      </div>

    </div>
  );
}

export default Reports;