import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function WorkLifeChart({ data }) {


    return (

        <div>

            <h2>
                Work Life Balance
            </h2>


            <ResponsiveContainer

                width="100%"

                height={300}

            >


                <BarChart data={data}>


                    <XAxis

                        dataKey="work_life_balance"

                        label={{
                            value: "Balance Level",
                            position: "insideBottom",
                            offset: -5
                        }}

                    />


                    <YAxis />


                    <Tooltip />


                    <Bar

                        dataKey="employees"

                    />


                </BarChart>


            </ResponsiveContainer>


        </div>

    );

}


export default WorkLifeChart;