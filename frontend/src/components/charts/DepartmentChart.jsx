import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";


function DepartmentChart({ data }) {


    const COLORS = [
        "#2563eb",
        "#16a34a",
        "#f59e0b"
    ];



    return (

        <div className="chart-card">


            <h2>
                Department Distribution
            </h2>



            <ResponsiveContainer width="100%" height={300}>


                <BarChart data={data}>


                    <XAxis

                        dataKey="department"

                    />


                    <YAxis />


                    <Tooltip />



                    <Bar

                        dataKey="employee_count"

                    >

                        {
                            data.map((entry, index) => (

                                <Cell

                                    key={`cell-${index}`}

                                    fill={COLORS[index % COLORS.length]}

                                />

                            ))
                        }


                    </Bar>



                </BarChart>


            </ResponsiveContainer>


        </div>

    );

}


export default DepartmentChart;