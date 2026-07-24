import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SettingsIcon from "@mui/icons-material/Settings";


function Sidebar() {

    const menuItems = [
        {
            name:"Dashboard",
            path:"/",
            icon:<DashboardIcon />
        },
        {
            name:"Employees",
            path:"/employees",
            icon:<PeopleIcon />
        },
        {
            name:"Analytics",
            path:"/analytics",
            icon:<AnalyticsIcon />
        },
        {
            name:"AI Assistant",
            path:"/ai-assistant",
            icon:<SmartToyIcon />
        },
        {
            name:"Settings",
            path:"/settings",
            icon:<SettingsIcon />
        }
    ];


    return (

        <aside className="sidebar">

            <h2>
                Workforce AI
            </h2>


            <nav>

            {
                menuItems.map((item)=>(
                    <NavLink 
                        key={item.name}
                        to={item.path}
                    >

                        {item.icon}

                        <span>
                            {item.name}
                        </span>

                    </NavLink>
                ))
            }

            </nav>


        </aside>

    );

}


export default Sidebar;