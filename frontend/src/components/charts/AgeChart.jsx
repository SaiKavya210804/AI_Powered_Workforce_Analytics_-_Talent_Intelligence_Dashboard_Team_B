import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function AgeChart({ data }) {


    const chartData = [

        {
            name: "Average Age",
            age: data.average_age
        },

        {
            name: "Youngest Employee",
            age: data.youngest_employee
        },

        {
            name: "Oldest Employee",
            age: data.oldest_employee
        }

    ];



    return (

        <div>

            <h2>
                Age Analysis
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

                        dataKey="age"

                    />


                </BarChart>


            </ResponsiveContainer>


        </div>

    );

}


export default AgeChart;