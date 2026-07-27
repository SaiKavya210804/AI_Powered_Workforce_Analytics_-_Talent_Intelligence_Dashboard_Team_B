import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";


function GenderDistributionChart({ data }) {


    const COLORS = [
        "#2563eb",
        "#ec4899"
    ];


    const totalEmployees = data.reduce(
        (sum, item) => sum + item.employee_count,
        0
    );



    return (

        <div className="chart-card">


            <h2>
                Gender Distribution
            </h2>



            <ResponsiveContainer
                width="100%"
                height={300}
            >


                <PieChart>


                    <Pie

                        data={data}

                        dataKey="employee_count"

                        nameKey="gender"

                        cx="50%"

                        cy="50%"

                        innerRadius={70}

                        outerRadius={110}

                        paddingAngle={5}

                    >


                        {
                            data.map((entry,index)=>(

                                <Cell

                                    key={`cell-${index}`}

                                    fill={COLORS[index % COLORS.length]}

                                />

                            ))
                        }


                    </Pie>



                    <Tooltip />


                    <Legend />


                </PieChart>


            </ResponsiveContainer>



            <div className="chart-summary">


                <span>
                    Total Employees
                </span>


                <strong>
                    {totalEmployees}
                </strong>


            </div>



        </div>

    );

}


export default GenderDistributionChart;