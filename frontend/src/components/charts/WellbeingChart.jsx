import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function WellbeingChart({ data }) {


    const chartData = [

        {
            category: "Environment Satisfaction",
            value: data.average_environment_satisfaction
        },

        {
            category: "Job Satisfaction",
            value: data.average_job_satisfaction
        },

        {
            category: "Work Life Balance",
            value: data.average_work_life_balance
        },

        {
            category: "Relationship Satisfaction",
            value: data.average_relationship_satisfaction
        }

    ];



    return (

        <div>


            <h2>
                Employee Wellbeing
            </h2>



            <ResponsiveContainer width="100%" height={300}>


                <BarChart data={chartData}>


                    <XAxis

                        dataKey="category"

                        angle={-20}

                        textAnchor="end"

                        height={80}

                    />


                    <YAxis

                        domain={[0,5]}

                    />


                    <Tooltip />



                    <Bar

                        dataKey="value"

                    />


                </BarChart>


            </ResponsiveContainer>


        </div>

    );

}


export default WellbeingChart;