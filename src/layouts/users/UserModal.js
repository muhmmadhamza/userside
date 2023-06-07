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

const UserModal = (props) => {
  const { open, handleClose, selected } = props;
  const queryClient = useQueryClient();
  const updateUser = (user) => put("/user", user);
  const { mutate, isLoading } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      handleClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      user_id: selected.user_id,
      username: selected?.username || "",
      email: selected?.email || "",
      phone: selected?.phone || "",
      address: selected?.address || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
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
            label="Email"
            disabled
            fullWidth
            name={"email"}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <MDInput
            type="text"
            label="User Name"
            name={"userName"}
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            disabled
            fullWidth
          />
          <MDInput
            type="text"
            label="Phone"
            fullWidth
            name={"phone"}
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <MDInput
            type="text"
            label="Address"
            fullWidth
            name={"address"}
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <MDButton variant="gradient" color="info" type="submit">
            {isLoading ? <CircularProgress size={25} sx={{ color: "#fff" }} /> : "Submit"}
          </MDButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;

// Typechecking props for the UserModal
UserModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  selected: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    user_id: PropTypes.string,
  }),
};
