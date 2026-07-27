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


function SalaryDepartmentChart({ data }) {


    const COLORS = [

        "#fed7aa",
        "#fb923c",
        "#ea580c"

    ];



    const sortedData = [...data].sort(
        (a,b) =>
        b.average_salary - a.average_salary
    );



    return (

        <div className="chart-card">


            <h2>
                Average Salary By Department
            </h2>



            <ResponsiveContainer

                width="100%"

                height={320}

            >


                <BarChart

                    data={sortedData}

                    layout="vertical"

                    margin={{

                        top:20,

                        right:50,

                        left:60,

                        bottom:20

                    }}

                >


                    <XAxis

                        type="number"

                    />



                    <YAxis

                        type="category"

                        dataKey="department"

                        width={110}

                        tick={{
                            fontSize:11
                        }}

                    />



                    <Tooltip

                        formatter={
                            (value)=>
                            `$${value.toLocaleString()}`
                        }

                    />



                    <Bar

                        dataKey="average_salary"

                        radius={[
                            0,
                            8,
                            8,
                            0
                        ]}

                    >


                        <LabelList

                            dataKey="average_salary"

                            position="right"

                            formatter={
                                (value)=>
                                `$${value.toLocaleString()}`
                            }

                        />



                        {
                            sortedData.map(
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


export default SalaryDepartmentChart;