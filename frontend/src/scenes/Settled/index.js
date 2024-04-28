import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { mockDataSettled } from "../../data/mockData";
import Header from "../../components/Header";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { mirage } from 'ldrs'

mirage.register()

// Default values shown


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Settled = () => {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/transactions/settled"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const json = await response.json();
        setTransactions(json);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "employeeid",
      headerName: "Employee ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "billdate",
      headerName: "Bill Date",
      flex: 1,
    },
    {
      field: "settlementdate",
      headerName: "Settlement Date",
      flex: 1,
    },
    {
      field: "transactionvalue",
      headerName: "Transaction Amount",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Settled Transactions" subtitle="Managing the Employees" />
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
          m="40px 0 0 0"
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
            getRowId={(row) => row._id}
            checkboxSelection
            rows={transactions}
            columns={columns}
            slots={{
              toolbar: CustomToolbar, // Use the custom toolbar as a slot
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Settled;
