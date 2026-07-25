import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function SalaryDepartmentChart({ data }) {


    return (

        <div>


            <h2>
                Average Salary By Department
            </h2>



            <ResponsiveContainer width="100%" height={300}>


                <BarChart data={data}>


                    <XAxis

                        dataKey="department"

                    />


                    <YAxis />


                    <Tooltip />



                    <Bar

                        dataKey="average_salary"

                    />


                </BarChart>


            </ResponsiveContainer>


        </div>

    );

}


export default SalaryDepartmentChart;