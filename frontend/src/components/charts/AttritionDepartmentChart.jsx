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


        if(existing){

            existing[item.attrition] = item.employee_count;

        }

        else {

            acc.push({

                department:item.department,

                [item.attrition]:item.employee_count

            });

        }


        return acc;


    }, []);



    return (

        <div>


            <h2>
                Attrition By Department
            </h2>



            <ResponsiveContainer width="100%" height={300}>


                <BarChart data={formattedData}>


                    <XAxis 
                        dataKey="department"
                    />


                    <YAxis />


                    <Tooltip />


                    <Legend />



                    <Bar

                        dataKey="Yes"

                        stackId="a"

                    />



                    <Bar

                        dataKey="No"

                        stackId="a"

                    />



                </BarChart>


            </ResponsiveContainer>


        </div>

    );

}


export default AttritionDepartmentChart;