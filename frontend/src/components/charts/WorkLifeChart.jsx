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


function WorkLifeChart({ data }) {


    const COLORS = [

        "#c4b5fd",
        "#a78bfa",
        "#8b5cf6",
        "#6d28d9"

    ];



    return (

        <div className="chart-card">


            <h2>
                Work Life Balance Distribution
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

                        dataKey="work_life_balance"

                        label={{

                            value:"Balance Level",

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


export default WorkLifeChart;