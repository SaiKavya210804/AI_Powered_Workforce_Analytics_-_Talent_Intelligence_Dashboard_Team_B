function MetricCard({ title, value, subtitle }) {

    return (

        <div className="metric-card">

            <h3>
                {title}
            </h3>


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