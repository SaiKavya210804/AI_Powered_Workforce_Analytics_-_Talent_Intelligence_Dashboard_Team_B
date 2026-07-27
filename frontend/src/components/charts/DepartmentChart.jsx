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



            <ResponsiveContainer 
                width="100%" 
                height={320}
            >


                <BarChart 
                    data={data}
                    margin={{
                        top:20,
                        right:20,
                        left:10,
                        bottom:40
                    }}
                >



                    <XAxis

                        dataKey="department"

                        tick={{
                            fontSize:12
                        }}

                        angle={-15}

                        textAnchor="end"

                    />


                    <YAxis />



                    <Tooltip />



                    <Bar

                        dataKey="employee_count"

                        radius={[8,8,0,0]}

                        animationDuration={800}

                    >


                        {
                            data.map(
                                (entry,index)=>(

                                <Cell

                                    key={`cell-${index}`}

                                    fill={
                                        COLORS[index % COLORS.length]
                                    }

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