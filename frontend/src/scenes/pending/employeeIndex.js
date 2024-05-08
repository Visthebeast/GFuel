import { Box, useTheme } from "@mui/material";
// import { Button } from "@mui/material"
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { ethers } from "ethers";
import { mockDataEmployees } from "../../data/mockData";
import config from "./config";
import { mirage } from "ldrs";
import Typography from "@mui/material/Typography";


mirage.register();

// const empID="EMP001"

const EmployeePending = ({ empID }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [purchasesArray, setPurchasesArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//   const [selectedRows, setSelectedRows] = React.useState([]);
  const [settledBills, setSettledBills] = useState([]);

  const getRemainingAllowance = () => {
  const employee = mockDataEmployees.find(
    (emp) => emp.EmployeeId === empID
  );
  if (employee) {
    const totalTransactionsValue = settledBills.reduce(
    (acc, bill) => acc + bill.transactionvalue,
    0
    );
    return employee.EmployeeMonthlyAllowance - totalTransactionsValue;
  }
  return 0; // Default to 0 if employee not found
  };

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          config.providerURL
        );
        const wallet = new ethers.Wallet(config.privateKey, provider);
        const contract = new ethers.Contract(
          config.contractAddress,
          config.contractABI,
          wallet
        );

        const allPurchasesData = await contract.getAllPurchases();

        // Filter purchases to get only transactions with customerID matching empID to get specific employee data
        const filteredPurchasesData = allPurchasesData.filter(
          (purchase) => purchase.customerID === empID
        );

        const formattedPurchases = filteredPurchasesData.map((purchase, index) => ({
          ...purchase,
          id: index,
          Name: getEmployeeName(purchase.customerID),
          employerid: getEmployerID(purchase.customerID),
        }));
        const reversedPurchases = formattedPurchases.reverse();
        setPurchasesArray(reversedPurchases);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching purchases:", error);
        setError("Error fetching purchases. Please try again later.");
        setLoading(false);
      }
    };

    const fetchSettledBills = async () => {
      try {
        // Fetch settled bills data from backend or wherever it's stored
        const settledBillsData = await fetch(
          `http://localhost:8000/api/transactions/employee/${empID}`
        );
        const settledBillsJson = await settledBillsData.json();
        setSettledBills(settledBillsJson);
      } catch (error) {
        console.error("Error fetching settled bills:", error);
        // Handle error
      }
    };


    fetchSettledBills();
    fetchPurchases();
  }, [empID]);

  const getEmployeeName = (employeeId) => {
    const employee = mockDataEmployees.find(
      (emp) => emp.EmployeeId === employeeId
    );
    return employee ? employee.EmployeeName : "";
  };

  const getEmployerID = (employeeId) => {
    const employee = mockDataEmployees.find(
      (emp) => emp.EmployeeId === employeeId
    );
    return employee ? employee.EmployerId : "";
  };

  // Filter out settled bills from purchasesArray
  const filteredPurchasesArray = purchasesArray.filter(
    (purchase) =>
      !settledBills.some(
        (settledBill) => settledBill.index === parseInt(purchase.index._hex, 16)
      )
  );

//   // console.log(purchasesArray)
//   const handleSelectionChange = (newSelection) => {
//     setSelectedRows(newSelection);
//   };

//   const handleSettleButtonClick = async () => {
//     try {
//       const selectedTransactions = purchasesArray.filter((row) =>
//         selectedRows.includes(row.id)
//       );

//       // Transform selected transactions into the specified format
//       const transformedTransactions = selectedTransactions.map(
//         (transaction) => {
//           const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

//           return {
//             employeeid: transaction.customerID,
//             employerid: transaction.employerid,
//             billdate: transaction.date,
//             settlementdate: currentDate,
//             transactionvalue: parseInt(transaction.price._hex, 16), // Convert hex value to integer
//             index: parseInt(transaction.index._hex, 16), // Convert hex value to integer
//           };
//         }
//       );

//       console.log(JSON.stringify(transformedTransactions));

//       // Post transformed transactions to the backend
//       const response = await fetch(
//         "http://localhost:8000/api/transactions/settled",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(transformedTransactions),
//         }
//       );
//       const json = await response.json();

//       if (!response.ok) {
//         setError(json.error);
//         throw new Error("Failed to settle transactions");
//       } else if (response.ok) {
//         console.log("Transactions settled:", json);
//         // Update purchasesArray state to reflect settled transactions
//         const updatedPurchasesArray = purchasesArray.filter(
//           (row) => !selectedRows.includes(row.id)
//         );
//         setPurchasesArray(updatedPurchasesArray);
//         // Update settledBills state to trigger re-render
//         const fetchedSettledBills = await fetch(
//           `http://localhost:8000/api/transactions/employee/${empID}`
//         );
//         const settledBillsJson = await fetchedSettledBills.json();
//         setSettledBills(settledBillsJson);
//       }
//       // Clear the selection
//       setSelectedRows([]);
//     } catch (error) {
//       console.error("Error settling transactions:", error);
//       // Handle error
//     }
//   };

  if (error) {
    return <div>{error}</div>;
  }

  const columns = [
    {
      field: "customerID",
      headerName: "Employee ID",
      flex: 1,
    },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Bill Date",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Bill Amount",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Pending Transactions" subtitle="My pending bills" />
      {/* Add remaining allowance display */}
      <Box
        position="absolute"
        top="130px" // Adjust the distance from the top as needed
        right="20px" // Adjust the distance from the right as needed
        backgroundColor={colors.primary[400]} // Add a subtle background highlight
        padding="8px" // Add padding for better visual separation
        borderRadius="4px" // Add rounded corners for a softer look
      >
        <Typography
          variant="body1"
          color={colors.greenAccent[300]} // Adjust text color based on theme
          fontWeight="bold" // Make the text bold for emphasis
        >
          <span style={{ marginRight: "8px" }}>Remaining Allowance:</span>₹
          {getRemainingAllowance()}/-
        </Typography>
      </Box>

      {loading ? ( // Show loading indicator while data is being fetched
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "75vh", // Adjust the height as needed
          }}
        >
          <l-mirage
            size="60"
            speed="2.5"
            color={colors.greenAccent[500]}
          ></l-mirage>
        </div>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          marginTop="40px"
          sx={{
            position: "relative",
          }}
        >
          {/* <Button
            id="settleButton"
            variant="contained"
            color="secondary"
            onClick={handleSettleButtonClick}
            sx={{
              position: "absolute",
              top: 8,
              right: 0,
              zIndex: 1,
            }}
          >
            Settle Transactions
          </Button> */}
          <Box
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              getRowId={(row) => row.id}
              checkboxSelection
            //   onRowSelectionModelChange={handleSelectionChange}
              rows={filteredPurchasesArray}
              columns={columns}
              slots={{
                toolbar: GridToolbarContainer,
                columnsButton: GridToolbarColumnsButton,
                filterButton: GridToolbarFilterButton,
                densitySelector: GridToolbarDensitySelector,
                exportButton: GridToolbarExport,
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EmployeePending;
