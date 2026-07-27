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

  const [highCount, setHighCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(0);
  const [lowCount, setLowCount] = useState(0);



  useEffect(() => {

    loadAlerts();

  }, []);




  const loadAlerts = async () => {


    try {


      const attrition = await getAttrition();

      const department = await getDepartmentAttrition();

      const wellbeing = await getWellbeing();



      let alertList = [];



      // ==============================
      // Overall Attrition Alert
      // ==============================


      const overallRate =
        parseFloat(attrition.attrition_rate);



      if (overallRate > 15) {


        alertList.push({

          title:
            "High Overall Attrition",

          message:
            `Overall attrition rate is ${attrition.attrition_rate}.`,

          riskNote:
            "High employee turnover can increase hiring costs, reduce productivity, and lead to loss of experienced workforce.",

          priority:
            "High",

          timestamp:
            new Date().toLocaleString(),

        });


      }





      // ==============================
      // Department Attrition Alert
      // ==============================


      department.forEach((dept) => {



        if (dept.attrition === "Yes") {



          const totalDept =

            department

              .filter(
                (d) =>
                  d.department === dept.department
              )

              .reduce(
                (sum, d) =>
                  sum + d.employee_count,
                0
              );



          const rate =
            (dept.employee_count / totalDept) * 100;



          if (rate > 20) {



            alertList.push({


              title:
                `${dept.department} Attrition`,


              message:
                `${rate.toFixed(1)}% employees have left.`,



              riskNote:
                "High attrition in a specific department may indicate workload issues, leadership problems, or employee dissatisfaction.",



              priority:
                "Medium",



              timestamp:
                new Date().toLocaleString(),


            });


          }


        }


      });





      // ==============================
      // Job Satisfaction Alert
      // ==============================


      if (
        wellbeing.average_job_satisfaction < 3
      ) {


        alertList.push({


          title:
            "Low Job Satisfaction",



          message:
            `Average Job Satisfaction is ${wellbeing.average_job_satisfaction}.`,



          riskNote:
            "Low satisfaction can lead to reduced engagement, lower performance, and increased chances of employee resignation.",



          priority:
            "Medium",



          timestamp:
            new Date().toLocaleString(),


        });


      }






      // ==============================
      // Work Life Balance Alert
      // ==============================


      if (
        wellbeing.average_work_life_balance < 3
      ) {


        alertList.push({


          title:
            "Poor Work-Life Balance",



          message:
            `Average Work-Life Balance is ${wellbeing.average_work_life_balance}.`,



          riskNote:
            "Poor work-life balance may cause employee burnout, stress, and negatively impact retention.",



          priority:
            "Medium",



          timestamp:
            new Date().toLocaleString(),


        });


      }






      setAlerts(alertList);



      setHighCount(
        alertList.filter(
          (a) => a.priority === "High"
        ).length
      );


      setMediumCount(
        alertList.filter(
          (a) => a.priority === "Medium"
        ).length
      );


      setLowCount(
        alertList.filter(
          (a) => a.priority === "Low"
        ).length
      );



    }

    catch(error) {

      console.error(
        "Smart Alert Error:",
        error
      );

    }


  };





  return (


    <div className="smart-alerts-container">


      <h1>
        Smart Alerts
      </h1>


      <p>
        AI-powered workforce alerts generated from live analytics.
      </p>





      <div className="summary-cards">


        <div className="summary-card">
          <h3>Total Alerts</h3>
          <h2>{alerts.length}</h2>
        </div>



        <div className="summary-card">
          <h3>High</h3>
          <h2>{highCount}</h2>
        </div>



        <div className="summary-card">
          <h3>Medium</h3>
          <h2>{mediumCount}</h2>
        </div>



        <div className="summary-card">
          <h3>Low</h3>
          <h2>{lowCount}</h2>
        </div>


      </div>





      {
        alerts.map(
          (alert,index)=>(


            <AlertCard

              key={index}

              title={alert.title}

              message={alert.message}

              riskNote={alert.riskNote}

              priority={alert.priority}

              timestamp={alert.timestamp}

            />


          )
        )
      }




    </div>


  );

}


export default SmartAlerts;