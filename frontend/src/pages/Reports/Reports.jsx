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

        <div className="report-card">
          <h2>Workforce Summary Report</h2>
          <p>Generate a summary of workforce insights.</p>

          <div className="button-group">
            <button>Generate</button>
            <button>PDF</button>
            <button>CSV</button>
          </div>
        </div>

        <div className="report-card">
          <h2>Employee Report</h2>
          <p>Export employee information.</p>

          <div className="button-group">
            <button>Generate</button>
            <button>PDF</button>
            <button>CSV</button>
          </div>
        </div>

        <div className="report-card">
          <h2>Analytics Report</h2>
          <p>Download workforce analytics.</p>

          <div className="button-group">
            <button>Generate</button>
            <button>PDF</button>
            <button>CSV</button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Reports;