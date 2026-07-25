import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function SatisfactionChart({ data }) {


    return (

        <div>

            <h2>
                Job Satisfaction
            </h2>


            <ResponsiveContainer

                width="100%"

                height={300}

            >


                <BarChart data={data}>


                    <XAxis

                        dataKey="job_satisfaction"

                        label={{
                            value: "Satisfaction Level",
                            position: "insideBottom",
                            offset: -5
                        }}

                    />


                    <YAxis />


                    <Tooltip />


                    <Bar

                        dataKey="employees"

                    />


                </BarChart>


            </ResponsiveContainer>


        </div>

    );

}


export default SatisfactionChart;