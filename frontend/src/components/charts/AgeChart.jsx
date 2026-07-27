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


function AgeChart({ data }) {


    const COLORS = [
        "#bfdbfe",
        "#93c5fd",
        "#60a5fa",
        "#3b82f6",
        "#1d4ed8"
    ];



    return (

        <div className="chart-card">


            <h2>
                Age Distribution
            </h2>



            <ResponsiveContainer

                width="100%"

                height={350}

            >


                <BarChart

                    data={data}

                    margin={{
                        top:30,
                        right:30,
                        left:20,
                        bottom:20
                    }}

                >


                    <XAxis

                        dataKey="age_group"

                        interval={0}

                    />


                    <YAxis />


                    <Tooltip

                        cursor={{
                            fill:"rgba(37,99,235,0.08)"
                        }}

                    />



                    <Bar

                        dataKey="employees"

                        radius={[
                            8,
                            8,
                            0,
                            0
                        ]}

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


export default AgeChart;