import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useQuery } from "@tanstack/react-query";
import { get } from "axioshelper";
import { Box, Icon, IconButton } from "@mui/material";
import MDDataGrid from "components/MDDatagrid";
import PlansModal from "./PlansModal";

function Membership() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});

  const handleClose = () => setOpen(false);

  const { data, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: () => get(`/membership_plans`),
  });

  const handleOpen = (row) => {
    console.log(row);
    setOpen(true);
    setSelected(row || null);
  };

  const columns = [
    { headerName: "Plan Name", field: "plan_name", flex: 1 },
    { headerName: "Language", field: "language", flex: 1 },
    { headerName: "Ad Duration", field: "ad_duration", flex: 1 },
    { headerName: "No. Of Ads", field: "no_of_ads", flex: 0.5 },
    { headerName: "Ad Type", field: "ad_type", flex: 0.5 },
    { headerName: "Plan Price", field: "plan_price", flex: 1 },
    {
      headerName: "",
      field: "*",

      renderCell: ({ row }) => (
        <Box>
          <IconButton onClick={() => handleOpen(row)}>
            <Icon>edit</Icon>
          </IconButton>
        </Box>
      ),
    },
  ];

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
                  Membership Plans
                </MDTypography>
              </MDBox>
              <MDBox pt={3} p={1}>
                <MDDataGrid
                  columns={columns}
                  isLoading={isLoading}
                  data={data ? data : []}
                  id={"plan_id"}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <PlansModal open={open} handleClose={handleClose} selected={selected} />
    </DashboardLayout>
  );
}

export default Membership;
