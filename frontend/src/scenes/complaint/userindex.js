import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { mockDataEmployees } from "../../data/mockData";



const ComplaintForm = ({ empID }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const findEmployerIdByEmpId = (empID) => {
    const employee = mockDataEmployees.find(
      (employee) => employee.EmployeeId === empID
    );
    if (employee) {
      return employee.EmployerId;
    } else {
      return null; // Return null if empID is not found
    }
  };

  const employerId = findEmployerIdByEmpId(empID);

  const handleFormSubmit = async (values, {resetForm}) => {
    try {
      // Assuming you have an API endpoint to submit the complaint
      const response = await fetch(
        "http://localhost:8000/api/complaints/filecomplaint",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            employeeid: empID,
            employerid: employerId
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit complaint");
      }

      // Handle success
      console.log("Complaint submitted successfully");
      resetForm();
      // console.log(response)
    } catch (error) {
      // Handle error
      console.error("Error submitting complaint:", error);
    }
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
