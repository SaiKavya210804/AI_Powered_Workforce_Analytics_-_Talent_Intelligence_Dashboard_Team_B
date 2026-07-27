import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";


function AttritionDepartmentChart({ data }) {


    const formattedData = data.reduce((acc, item) => {


        const existing = acc.find(
            dept => dept.department === item.department
        );


        if (existing) {

            existing[item.attrition] = item.employee_count;

        }

        else {

            acc.push({

                department: item.department,

                [item.attrition]: item.employee_count

            });

        }


        return acc;


    }, []);




    return (

        <div className="chart-card">


            <h2>
                Attrition By Department
            </h2>




            <ResponsiveContainer

                width="100%"

                height={350}

            >


                <BarChart

                    data={formattedData}

                    layout="vertical"

                    margin={{

                        top:20,

                        right:40,

                        left:100,

                        bottom:20

                    }}

                >



                    <XAxis

                        type="number"

                    />



                    <YAxis

                        type="category"

                        dataKey="department"

                        width={90}

                    />



                    <Tooltip />



                    <Legend />




                    <Bar

                        dataKey="Yes"

                        name="Attrition"

                        fill="#ef4444"

                        radius={[0,8,8,0]}

                    />



                    <Bar

                        dataKey="No"

                        name="Active Employees"

                        fill="#94a3b8"

                        radius={[0,8,8,0]}

                    />



                </BarChart>


            </ResponsiveContainer>


        </div>

    );

}


export default AttritionDepartmentChart;