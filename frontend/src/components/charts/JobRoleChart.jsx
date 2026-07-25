import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function JobRoleChart({ data }) {


    return (

        <div>

            <h2>
                Job Role Distribution
            </h2>


            <ResponsiveContainer 
                width="100%" 
                height={350}
            >


                <BarChart data={data}>


                    <XAxis

                        dataKey="job_role"

                        angle={-35}

                        textAnchor="end"

                        height={100}

                    />


                    <YAxis />


                    <Tooltip />


                    <Bar

                        dataKey="employee_count"

                    />


                </BarChart>


            </ResponsiveContainer>


        </div>

    );

}


export default JobRoleChart;