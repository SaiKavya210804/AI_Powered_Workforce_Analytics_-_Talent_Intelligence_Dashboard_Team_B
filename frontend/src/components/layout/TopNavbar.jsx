import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


function TopNavbar() {

    return (

        <header className="top-navbar">

            <div className="navbar-title">
                AI Powered Workforce Dashboard
            </div>


            <div className="navbar-actions">

                <NotificationsIcon />


                <div className="profile">

                    <AccountCircleIcon />

                    <span>
                        Admin
                    </span>

                </div>

            </div>

        </header>

    );

}


export default TopNavbar;