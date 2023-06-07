import { Box, Card, Grid, Icon, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { get } from "axioshelper";
import MDBox from "components/MDBox";
import MDDataGrid from "components/MDDatagrid";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import AdsModal from "./AdsModal";

function Ads() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});

  const handleClose = () => setOpen(false);

  const { data, isLoading } = useQuery({
    queryKey: ["ads"],
    queryFn: () => get(`/ad`),
  });

  const handleOpen = (row) => {
    setOpen(true);
    setSelected(row);
  };

  const columns = [
    { headerName: "Title", field: "title", minWidth: 250, flex: 0.5 },
    { headerName: "Description", field: "description", minWidth: 250, flex: 1 },
    { headerName: "Type", field: "ad_type", minWidth: 150, flex: 0.5 },
    { headerName: "Price", field: "price", minWidth: 150, flex: 0.5 },
    { headerName: "Status", field: "status", minWidth: 150, flex: 0.5 },
    { headerName: "Location", field: "source_location_address", minWidth: 250, flex: 1 },
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
                  Ads Management
                </MDTypography>
              </MDBox>
              <MDBox pt={3} p={1}>
                <MDDataGrid
                  columns={columns}
                  isLoading={isLoading}
                  data={data ? data : []}
                  id={"ad_id"}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <AdsModal open={open} handleClose={handleClose} selected={selected} />
    </DashboardLayout>
  );
}

export default Ads;
