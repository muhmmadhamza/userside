import * as React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import MDInput from "components/MDInput";
import { useFormik } from "formik";
import MDButton from "components/MDButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { put } from "axioshelper";
import { CircularProgress } from "@mui/material";

const PlansModal = (props) => {
  const { open, handleClose, selected } = props;
  const queryClient = useQueryClient();
  const updateUser = (user) => put("/membership_plans", user);
  const { mutate: updateAd, isLoading } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries("plans");
      handleClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      plan_id: selected.plan_id || "",
      plan_id_sal: selected.plan_id_sal || "",
      language: selected.language || "",
      role_id: selected.role_id || "",
      plan_name: selected.plan_name || "",
      ad_duration: selected.ad_duration || "",
      no_of_ads: selected.no_of_ads || "",
      ad_type: selected.ad_type || "",
      plan_price: selected.plan_price || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      updateAd(values);
    },
  });

  console.log(formik.values.plan_name);

  return (
    <Dialog fullWidth maxWidth={"sm"} open={open} onClose={handleClose}>
      <DialogTitle>Update Plan</DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "100%",
            p: 1,
            gap: "1rem",
          }}
        >
          <MDInput
            type="text"
            label="Plan Name"
            fullWidth
            name={"plan_name"}
            value={formik.values.plan_name}
            onChange={formik.handleChange}
          />
          <MDInput
            type="text"
            label="Language"
            name={"language"}
            value={formik.values.language}
            onChange={formik.handleChange}
            fullWidth
          />
          <MDInput
            type="text"
            label="ad_duration"
            fullWidth
            name={"ad_duration"}
            value={formik.values.ad_duration}
            onChange={formik.handleChange}
          />
          <MDInput
            type="text"
            label="Type"
            fullWidth
            name={"ad_type"}
            value={formik.values.ad_type}
            onChange={formik.handleChange}
          />
          <MDInput
            type="text"
            label="No. Of Ads"
            fullWidth
            name={"no_of_ads"}
            value={formik.values.no_of_ads}
            onChange={formik.handleChange}
          />
          <MDInput
            type="select"
            label="Plan Price"
            fullWidth
            name={"plan_price"}
            value={formik.values.plan_price}
            onChange={formik.handleChange}
          />
          <MDButton variant="gradient" color="info" type="submit" mt={1}>
            {isLoading ? <CircularProgress size={25} sx={{ color: "#fff" }} /> : "Submit"}
          </MDButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PlansModal;

// Typechecking props for the PlansModal
PlansModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  selected: PropTypes.shape({
    plan_id: PropTypes.number,
    plan_id_sal: PropTypes.number,
    language: PropTypes.string,
    role_id: PropTypes.number,
    plan_name: PropTypes.string,
    ad_duration: PropTypes.string,
    no_of_ads: PropTypes.string,
    ad_type: PropTypes.string,
    plan_price: PropTypes.number,
  }),
};
