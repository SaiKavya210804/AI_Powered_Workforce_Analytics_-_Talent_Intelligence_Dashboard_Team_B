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


function SalaryChart({ data }) {


    const chartData = [

        {
            name: "Average Salary",
            salary: data.average_salary
        },

        {
            name: "Highest Salary",
            salary: data.highest_salary
        },

        {
            name: "Lowest Salary",
            salary: data.lowest_salary
        }

    ];



    const COLORS = [

        "#ddd6fe",
        "#a78bfa",
        "#7c3aed"

    ];



    return (

        <div className="chart-card">


            <h2>
                Monthly Income Analysis
            </h2>



            <ResponsiveContainer

                width="100%"

                height={280}

            >


                <BarChart

                    data={chartData}

                    layout="vertical"

                    margin={{

                        top:20,

                        right:70,

                        left:30,

                        bottom:20

                    }}

                >


                    <XAxis

                        type="number"

                    />


                    <YAxis

                        type="category"

                        dataKey="name"

                        width={100}

                    />



                    <Tooltip

                        formatter={
                            (value)=>
                            `$${value.toLocaleString()}`
                        }

                    />



                    <Bar

                        dataKey="salary"

                        radius={[
                            0,
                            8,
                            8,
                            0
                        ]}

                    >


                        <LabelList

                            dataKey="salary"

                            position="right"

                            formatter={
                                (value)=>
                                `$${value.toLocaleString()}`
                            }

                        />



                        {
                            chartData.map(
                                (entry,index)=>(

                                    <Cell

                                        key={index}

                                        fill={
                                            COLORS[index]
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


export default SalaryChart;