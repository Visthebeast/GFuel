import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const ComplaintForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="COMPLAINTS" subtitle="Send Feedbacks and Complaints" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={complaintSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(1, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 1" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Subject"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.subject}
                name="subject"
                error={!!touched.subject && !!errors.subject}
                helperText={touched.subject && errors.subject}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                multiline
                rows={6} // Adjust the number of rows here as needed
                label="Complaint"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.complaint}
                name="complaint"
                error={!!touched.complaint && !!errors.complaint}
                helperText={touched.complaint && errors.complaint}
                sx={{ gridColumn: "span 1" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                File Complaint
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const complaintSchema = yup.object().shape({
  subject: yup.string().required("Subject is required"),
  complaint: yup.string().required("Complaint is required"),
});

const initialValues = {
  subject: "",
  complaint: "",
};

export default ComplaintForm;
