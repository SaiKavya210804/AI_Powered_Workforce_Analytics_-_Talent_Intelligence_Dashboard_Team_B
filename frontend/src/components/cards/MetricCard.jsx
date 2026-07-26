function MetricCard({ title, value, subtitle, icon, color }) {

    return (

        <div className="metric-card">


            <div className="metric-header">


                <div

                    className="metric-icon"

                    style={{
                        background: `${color}20`,
                        color: color
                    }}

                >

                    {icon}

                </div>



                <h3>
                    {title}
                </h3>


            </div>





            <p className="metric-value">

                {value}

            </p>




            {
                subtitle && (

                    <span className="metric-subtitle">

                        {subtitle}

                    </span>

                )
            }


        </div>

    );

}


export default MetricCard;