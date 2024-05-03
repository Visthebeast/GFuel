import { Box, Button, useTheme } from "@mui/material";
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

mirage.register();


const Settled = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [purchasesArray, setPurchasesArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        const purchasesData = await contract.getAllPurchases();
        const formattedPurchases = purchasesData.map((purchase, index) => ({
          ...purchase,
          id: index,
          Name: getEmployeeName(purchase.customerID),
        }));
        setPurchasesArray(formattedPurchases);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching purchases:", error);
        setError("Error fetching purchases. Please try again later.");
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const getEmployeeName = (employeeId) => {
    const employee = mockDataEmployees.find(
      (emp) => emp.EmployeeId === employeeId
    );
    return employee ? employee.EmployeeName : "";
  };

  const [selectedRows, setSelectedRows] = React.useState([]); // State to store selected rows

  const handleSelectionChange = (newSelection) => {
    // Handle selection change here
    // console.log("New selection:", newSelection);
    setSelectedRows(newSelection);
  };

  const handleSettleButtonClick = () => {
    console.log("Selected transactions:", selectedRows);
    // You can perform actions on the selected transactions here (e.g., API call)
  };

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
      <Header title="Pending Transactions" subtitle="Managing the Employees" />
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
        <Button
          id="settleButton"
          variant="contained"
          color="secondary"
          onClick={handleSettleButtonClick}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
          }}
        >
          Settle Transactions
        </Button>
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
            onRowSelectionModelChange={handleSelectionChange}
            rows={purchasesArray}
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

export default Settled;
