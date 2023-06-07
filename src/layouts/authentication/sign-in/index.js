import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { post } from "axioshelper";
import { useFormik } from "formik";
import * as yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef, useState } from "react";
import { CircularProgress } from "@mui/material";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
  email: yup
    .string("Enter Email")
    .max(100, "Email must be maximun 100 characters long.")
    .email("please enter a valid email address")
    .required("Email is required"),
  password: yup.string("Enter Password").required("Password is required"),
});

function Basic() {
  const naviagte = useNavigate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { data } = await post("auth/signin", values);
      localStorage.setItem("token", data.token);
      setLoading(false);
      naviagte("/dashboard");
    } catch (error) {
      setOpen(true);
      setLoading(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" onSubmit={formik.handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                name={"email"}
                value={formik.values.email}
                onChange={formik.handleChange}
                helperText={
                  <MDTypography color="error" component="span" variant="caption">
                    {(formik.touched.email && formik.errors.email) || ""}
                  </MDTypography>
                }
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                label="Password"
                type="password"
                fullWidth
                name={"password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                helperText={
                  <MDTypography color="error" component="span" variant="caption">
                    {(formik.touched.password && formik.errors.password) || ""}
                  </MDTypography>
                }
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type={"submit"}>
                {loading ? <CircularProgress size={25} sx={{ color: "#fff" }} /> : "sign in"}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity="error">Invaid credentials</Alert>
      </Snackbar>
    </BasicLayout>
  );
}

export default Basic;
