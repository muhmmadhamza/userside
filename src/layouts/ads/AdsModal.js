import * as React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import MDInput from "components/MDInput";
import { useFormik } from "formik";
import MDButton from "components/MDButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { put } from "axioshelper";
import { CircularProgress } from "@mui/material";

const AdsModal = (props) => {
  const { open, handleClose, selected } = props;
  const queryClient = useQueryClient();
  const updateUser = (user) => put("/ad", user);
  const { mutate: updateAd, isLoading } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries("ads");
      handleClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      ad_id: selected.ad_id,
      user_id: selected.user_id,
      category_id: selected.category_id,
      category_id_sal: selected.category_id_sal,
      ad_type: selected.ad_type,
      title: selected.title,
      description: selected.description,
      price: selected.price,
      expiry_date: selected.expiry_date,
      status: selected.status,
      source_location_address: selected.source_location_address,
      source_city_id_sal: selected.source_city_id_sal,
      source_city_id: selected.source_city_id,
      source_country_id_sal: selected.source_country_id_sal,
      source_country_id: selected.source_country_id,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      updateAd(values);
    },
  });

  return (
    <Dialog fullWidth maxWidth={"sm"} open={open} onClose={handleClose}>
      <DialogTitle>Update User</DialogTitle>
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
            label="Title"
            fullWidth
            name={"title"}
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <MDInput
            type="text"
            label="Description"
            name={"description"}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            fullWidth
          />
          <MDInput
            type="text"
            label="Price"
            fullWidth
            name={"price"}
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <MDInput
            type="text"
            label="Type"
            fullWidth
            name={"ad_type"}
            value={formik.values.ad_type}
            onChange={formik.handleChange}
            error={formik.touched.ad_type && Boolean(formik.errors.ad_type)}
            helperText={formik.touched.ad_type && formik.errors.ad_type}
          />
          <MDInput
            type="text"
            label="Status"
            fullWidth
            name={"status"}
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
          />
          <MDInput
            type="text"
            label="Source Location Address"
            fullWidth
            name={"source_location_address"}
            value={formik.values.source_location_address}
            onChange={formik.handleChange}
            error={
              formik.touched.source_location_address &&
              Boolean(formik.errors.source_location_address)
            }
            helperText={
              formik.touched.source_location_address && formik.errors.source_location_address
            }
          />
          <MDButton variant="gradient" color="info" type="submit" mt={1}>
            {isLoading ? <CircularProgress size={25} sx={{ color: "#fff" }} /> : "Submit"}
          </MDButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AdsModal;

// Typechecking props for the AdsModal
AdsModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  selected: PropTypes.shape({
    ad_id: PropTypes.number,
    user_id: PropTypes.number,
    category_id: PropTypes.number,
    category_id_sal: PropTypes.number,
    ad_type: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    expiry_date: PropTypes.any,
    status: PropTypes.string,
    source_location_address: PropTypes.string,
    source_city_id_sal: PropTypes.number,
    source_city_id: PropTypes.number,
    source_country_id_sal: PropTypes.number,
    source_country_id: PropTypes.number,
  }),
};
