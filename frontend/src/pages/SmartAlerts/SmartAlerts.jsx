import { useEffect, useState } from "react";
import AlertCard from "../../components/alerts/AlertCard";
import {
  getAttrition,
  getDepartmentAttrition,
  getWellbeing,
} from "../../services/alertService";

import "./SmartAlerts.css";

function SmartAlerts() {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {

    try {

      const attrition = await getAttrition();
      const department = await getDepartmentAttrition();
      const wellbeing = await getWellbeing();

      let alertList = [];

      // Overall Attrition Alert
      const overallRate = parseFloat(attrition.attrition_rate);

      if (overallRate > 15) {
        alertList.push({
          title: "High Overall Attrition",
          message: `Overall attrition rate is ${attrition.attrition_rate}.`,
          priority: "High",
        });
      }

      // Department Attrition Alert
      department.forEach((dept) => {

        if (dept.attrition === "Yes") {

          const totalDept =
            department
              .filter((d) => d.department === dept.department)
              .reduce((sum, d) => sum + d.employee_count, 0);

          const rate = (dept.employee_count / totalDept) * 100;

          if (rate > 20) {
            alertList.push({
              title: `${dept.department} Attrition`,
              message: `${rate.toFixed(1)}% employees have left.`,
              priority: "Medium",
            });
          }

        }

      });

      // Job Satisfaction
      if (wellbeing.average_job_satisfaction < 3) {

        alertList.push({
          title: "Low Job Satisfaction",
          message: `Average Job Satisfaction is ${wellbeing.average_job_satisfaction}`,
          priority: "Medium",
        });

      }

      // Work Life Balance
      if (wellbeing.average_work_life_balance < 3) {

        alertList.push({
          title: "Poor Work-Life Balance",
          message: `Average Work-Life Balance is ${wellbeing.average_work_life_balance}`,
          priority: "Medium",
        });

      }

      setAlerts(alertList);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="smart-alerts-container">

      <h1>Smart Alerts</h1>

      <p>
        AI-powered workforce alerts generated from live analytics.
      </p>

      {alerts.map((alert, index) => (

        <AlertCard
          key={index}
          title={alert.title}
          message={alert.message}
          priority={alert.priority}
        />

      ))}

    </div>

  );

}

export default SmartAlerts;