import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";


function GenderDistributionChart({ data }) {


    const COLORS = [
        "#2563eb",
        "#ec4899"
    ];


    return (

        <div className="chart-card">


            <h2>
                Gender Distribution
            </h2>


            <PieChart width={400} height={300}>


                <Pie

                    data={data}

                    dataKey="employee_count"

                    nameKey="gender"

                    cx="50%"

                    cy="50%"

                    outerRadius={100}

                    label

                >

                    {
                        data.map((entry, index) => (

                            <Cell

                                key={`cell-${index}`}

                                fill={COLORS[index]}

                            />

                        ))
                    }


                </Pie>


                <Tooltip />

                <Legend />


            </PieChart>


        </div>

    );

}


export default GenderDistributionChart;