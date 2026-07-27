import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import ApartmentIcon from "@mui/icons-material/Apartment";


function EmployeeStats({
  employees = [],
  totalEmployees = 0,
}) {


  const male = employees.filter(
    (e) => e.Gender === "Male"
  ).length;


  const female = employees.filter(
    (e) => e.Gender === "Female"
  ).length;


  const departments = [
    ...new Set(
      employees.map(
        (e) => e.Department
      )
    ),
  ].length;



  const cards = [

    {
      title: "Total Employees",
      value: totalEmployees,
      icon: (
        <GroupsIcon
          sx={{
            fontSize: 42
          }}
        />
      ),
      color: "#2563eb",
    },


    {
      title: "Male Employees",
      value: male,
      icon: (
        <ManIcon
          sx={{
            fontSize: 42
          }}
        />
      ),
      color: "#10b981",
    },


    {
      title: "Female Employees",
      value: female,
      icon: (
        <WomanIcon
          sx={{
            fontSize: 42
          }}
        />
      ),
      color: "#ec4899",
    },


    {
      title: "Departments",
      value: departments,
      icon: (
        <ApartmentIcon
          sx={{
            fontSize: 42
          }}
        />
      ),
      color: "#f59e0b",
    },

  ];



  return (

    <Box

      sx={{

        display: "grid",

        gridTemplateColumns: {

          xs: "1fr",

          sm: "repeat(2,1fr)",

          lg: "repeat(4,1fr)",

        },

        gap: 3,

        mb: 4,

      }}

    >


      {cards.map((card) => (


        <Card

          key={card.title}

          sx={{

            borderRadius: 3,

            boxShadow: 3,

            transition: "0.3s",

            "&:hover": {

              transform: "translateY(-5px)",

              boxShadow: 8,

            },

          }}

        >


          <CardContent>


            <Box

              sx={{

                display: "flex",

                alignItems: "center",

                gap: 2,

              }}

            >


              <Box

                sx={{

                  width: 60,

                  height: 60,

                  borderRadius: "50%",

                  backgroundColor:
                    `${card.color}20`,

                  display: "flex",

                  alignItems: "center",

                  justifyContent:
                    "center",

                  color: card.color,

                }}

              >

                {card.icon}

              </Box>



              <Box>


                <Typography

                  variant="body2"

                  color="text.secondary"

                >

                  {card.title}

                </Typography>



                <Typography

                  variant="h5"

                  fontWeight="bold"

                >

                  {card.value}

                </Typography>


              </Box>


            </Box>


          </CardContent>


        </Card>


      ))}


    </Box>


  );

}


export default EmployeeStats;