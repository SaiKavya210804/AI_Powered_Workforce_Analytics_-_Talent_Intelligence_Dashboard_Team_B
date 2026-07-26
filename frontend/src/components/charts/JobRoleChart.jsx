import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
    LabelList
} from "recharts";


function JobRoleChart({ data }) {


    const COLORS = [
        "#1d4ed8",
        "#2563eb",
        "#3b82f6",
        "#60a5fa",
        "#93c5fd",
        "#bfdbfe"
    ];



    const sortedData = [...data].sort(
        (a,b) =>
        b.employee_count - a.employee_count
    );



    return (

        <div className="chart-card">


            <h2>
                Job Role Distribution
            </h2>



            <ResponsiveContainer
                width="100%"
                height={350}
            >


                <BarChart

                    data={sortedData}

                    layout="vertical"

                    margin={{
                        top:20,
                        right:50,
                        left:30,
                        bottom:20
                    }}

                >



                    <XAxis

                        type="number"

                    />



                    <YAxis

                        type="category"

                        dataKey="job_role"

                        width={130}

                        tick={{
                            fontSize:12
                        }}

                    />



                    <Tooltip />



                    <Bar

                        dataKey="employee_count"

                        radius={[0,8,8,0]}

                    >



                        {
                            sortedData.map(
                                (entry,index)=>(

                                    <Cell

                                        key={`cell-${index}`}

                                        fill={
                                            COLORS[index % COLORS.length]
                                        }

                                    />

                                )
                            )
                        }



                        <LabelList

                            dataKey="employee_count"

                            position="right"

                            style={{
                                fontSize:12
                            }}

                        />


                    </Bar>



                </BarChart>


            </ResponsiveContainer>


        </div>

    );

}


export default JobRoleChart;