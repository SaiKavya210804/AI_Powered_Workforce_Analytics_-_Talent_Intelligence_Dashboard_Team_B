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



    const COLORS = [

        "#bbf7d0",
        "#4ade80",
        "#22c55e",
        "#15803d"

    ];



    return (

        <div className="chart-card">


            <h2>
                Employee Wellbeing
            </h2>



            <ResponsiveContainer

                width="100%"

                height={320}

            >


                <BarChart

                    data={chartData}

                    layout="vertical"

                    margin={{

                        top:20,

                        right:50,

                        left:50,

                        bottom:20

                    }}

                >


                    <XAxis

                        type="number"

                        domain={[0,5]}

                    />



                    <YAxis

                        type="category"

                        dataKey="category"

                        width={130}

                        tick={{
                            fontSize:12
                        }}

                    />



                    <Tooltip />



                    <Bar

                        dataKey="value"

                        radius={[0,8,8,0]}

                    >


                        <LabelList

                            dataKey="value"

                            position="right"

                            formatter={
                                (value)=>
                                value.toFixed(2)
                            }

                        />



                        {
                            chartData.map(

                                (entry,index)=>(

                                    <Cell

                                        key={index}

                                        fill={
                                            COLORS[index % COLORS.length]
                                        }

                                    />

                                )

                            )
                        }


                    </Bar>


                </BarChart>


            </ResponsiveContainer>


        </div>

    );

}


export default WellbeingChart;