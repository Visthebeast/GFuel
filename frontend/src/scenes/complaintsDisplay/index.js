import React, { useState, useEffect } from "react";
import { Box, Button, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";


const EmployerComplaints = ({ employerID }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/complaints/employer/${employerID}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch complaints");
        }
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, [employerID]);

  const resolveComplaint = async (complaintId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/complaints/${complaintId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to resolve complaint");
      }
      // Remove the resolved complaint from the complaints state
      setComplaints(
        complaints.filter((complaint) => complaint._id !== complaintId)
      );
    } catch (error) {
      console.error("Error resolving complaint:", error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="left" marginLeft='30px'>
      <h2>Complaints</h2>
      <Box
        width="80%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {complaints.map((complaint) => (
          <Box
            key={complaint._id}
            width="100%"
            border="1px solid #ccc"
            borderRadius="5px"
            padding="20px"
            marginBottom="20px"
          >
            <Typography
              variant="h5"
              color="secondary"
              style={{ textTransform: "capitalize", marginBottom: "10px" }}
            >
              {complaint.subject}
            </Typography>
            <Typography
              variant="body1"
              style={{ textTransform: "capitalize", marginBottom: "5px" }}
            >
              {complaint.complaint}
            </Typography>
            <Typography
              variant="body2"
              style={{ textTransform: "capitalize", marginBottom: "10px" }}>
              Employee ID: {complaint.employeeid}
            </Typography>
            <Button
              onClick={() => resolveComplaint(complaint._id)}
              variant="contained"
              color="secondary"
            >
              Resolved
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};  


export default EmployerComplaints;



//  return (
//     <Box display="flex" flexDirection="column" alignItems="center">
//       <h2>Complaints</h2>
//       <Box
//         width="80%"
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//       >
//         {complaints.map((complaint) => (
//           <Box
//             key={complaint._id}
//             width="100%"
//             border="1px solid #ccc"
//             borderRadius="5px"
//             padding="20px"
//             marginBottom="20px"
//           >
//             <h3 style={{ textTransform: "capitalize", color: "secondary" }}>
//               {complaint.subject}
//             </h3>
//             <p>{complaint.complaint}</p>
//             <p>Employee ID: {complaint.employeeid}</p>
//             <Button
//               onClick={() => resolveComplaint(complaint._id)}
//               variant="contained"
//               color="secondary"
//             >
//               Resolved
//             </Button>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };
// 
// export default EmployerComplaints;