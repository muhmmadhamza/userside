/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useQuery } from "@tanstack/react-query";
import { get } from "axioshelper";
import { Box, Icon, IconButton } from "@mui/material";
import MDDataGrid from "components/MDDatagrid";
import UserModal from "./UserModal";
import { useState } from "react";

const result = (array) => {
  return array.flatMap((item) => {
    const accountLenght = item?.users_profiles?.length;
    const user =
      accountLenght > 0
        ? item.users_profiles[0]
        : {
            user_id: Math.random(),
            first_name: "",
            last_name: "",
            profile_picture: null,
            address: "",
            bio: null,
            birth_date: "",
          };
    delete item.users_profiles;

    return !!item.email ? [{ ...user, ...item }] : [];
  });
};

function Users() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => get(`/user`),
  });

  const handleClose = () => setOpen(false);

  const handleOpen = (row) => {
    setOpen(true);
    setSelected(row);
  };

  const columns = [
    {
      headerName: "User Name",
      field: "username",
      flex: 1,
      minWidth: 250,
    },
    { headerName: "Email", field: "email", flex: 1, minWidth: 250 },
    { headerName: "Phone Number", field: "phone", flex: 1, minWidth: 250 },
    { headerName: "Address", field: "address", flex: 1, minWidth: 250 },
    {
      headerName: "",
      field: "*",
      renderCell: ({ row }) => (
        <Box>
          <IconButton color="info" onClick={() => handleOpen(row)}>
            <Icon>edit</Icon>
          </IconButton>
        </Box>
      ),
    },
  ];
  console.log(data);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Users
                </MDTypography>
              </MDBox>
              <MDBox pt={3} p={1}>
                <MDDataGrid
                  columns={columns}
                  isLoading={isLoading}
                  data={data ? result(data) : []}
                  id={"user_id"}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <UserModal open={open} handleClose={handleClose} selected={selected} />
    </DashboardLayout>
  );
}

export default Users;
