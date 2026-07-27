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


function SatisfactionChart({ data }) {


    const COLORS = [

        "#99f6e4",
        "#5eead4",
        "#14b8a6",
        "#0f766e"

    ];



    return (

        <div className="chart-card">


            <h2>
                Job Satisfaction Distribution
            </h2>



            <ResponsiveContainer

                width="100%"

                height={320}

            >


                <BarChart

                    data={data}

                    margin={{

                        top:20,

                        right:30,

                        left:20,

                        bottom:20

                    }}

                >


                    <XAxis

                        dataKey="job_satisfaction"

                        label={{

                            value:"Satisfaction Level",

                            position:"insideBottom",

                            offset:-5

                        }}

                    />


                    <YAxis />


                    <Tooltip />



                    <Bar

                        dataKey="employees"

                        radius={[8,8,0,0]}

                    >


                        <LabelList

                            dataKey="employees"

                            position="top"

                        />



                        {
                            data.map(

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


export default SatisfactionChart;