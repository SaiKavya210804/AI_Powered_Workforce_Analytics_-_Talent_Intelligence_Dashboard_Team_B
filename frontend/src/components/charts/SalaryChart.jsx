import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function SalaryChart({ data }) {


    const chartData = [

        {
            name: "Average Salary",
            salary: data.average_salary
        },

        {
            name: "Highest Salary",
            salary: data.highest_salary
        },

        {
            name: "Lowest Salary",
            salary: data.lowest_salary
        }

    ];



    return (

        <div>

            <h2>
                Salary Analysis
            </h2>


            <ResponsiveContainer
                width="100%"
                height={300}
            >


                <BarChart data={chartData}>


                    <XAxis

                        dataKey="name"

                    />


                    <YAxis />


                    <Tooltip />


                    <Bar

                        dataKey="salary"

                    />


                </BarChart>


            </ResponsiveContainer>


        </div>

    );

}


export default SalaryChart;