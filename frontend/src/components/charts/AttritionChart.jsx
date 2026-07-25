import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";



function AttritionChart({ data }) {


    const chartData = [

        {
            name: "Employees Left",
            value: data.employees_with_attrition
        },

        {
            name: "Employees Stayed",
            value: data.employees_without_attrition
        }

    ];



    const COLORS = [

        "#ef4444",

        "#22c55e"

    ];



    return (

        <div className="chart-card">


            <h2>
                Attrition Overview
            </h2>



            <ResponsiveContainer 
                width="100%" 
                height={300}
            >


                <PieChart>


                    <Pie

                        data={chartData}

                        dataKey="value"

                        nameKey="name"

                        cx="50%"

                        cy="50%"

                        outerRadius={110}

                        label

                    >

                        {
                            chartData.map((entry,index)=>(

                                <Cell

                                    key={`cell-${index}`}

                                    fill={COLORS[index]}

                                />

                            ))
                        }


                    </Pie>



                    <Tooltip />


                    <Legend />


                </PieChart>


            </ResponsiveContainer>


        </div>

    );

}


export default AttritionChart;