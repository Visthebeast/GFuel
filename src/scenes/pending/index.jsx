import { Box, Button, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { mockDataPending } from "../../data/mockData";
import Header from "../../components/Header";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,

} from "@mui/x-data-grid";

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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "EmployeeId",
      headerName: "Employee ID",
      flex: 1,
    },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "BillDate",
      headerName: "Bill Date",
      flex: 1,
    },
    {
      field: "TransactionValue",
      headerName: "Bill Amount",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
  ];

  const [selectedRows, setSelectedRows] = React.useState([]); // State to store selected rows

  const handleSelectionChange = (newSelection) => {
    //console.log("New selection:", newSelection);
    setSelectedRows(newSelection);
  };

  const handleSettleButtonClick = () => {
    console.log("Selected transactions:", selectedRows);
    // You can perform actions on the selected transactions here (e.g., API call)
  };

  return (
    <Box m="20px">
      <Header title="Settled Transactions" subtitle="Managing the Employees" />
      <Box
        display="flex"
        flexDirection="column"
        marginTop="40px"
        sx={{
          position: "relative", // Ensure button and DataGrid are positioned relative to this container
        }}
      >
        <Button
          id="settleButton"
          variant="contained"
          color="secondary"
          onClick={handleSettleButtonClick}
          sx={{
            position: "absolute", // Position the button absolutely within the container
            top: 0, // Place the button at the top of the container
            right: 0, // Align the button to the right side
            zIndex: 1, // Ensure the button appears above the DataGrid
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
            getRowId={(row) => row._id.$oid}
            checkboxSelection
            onSelectionChange={(e) => console.log(e.rows)}
            onRowSelectionModelChange={handleSelectionChange}
            rows={mockDataPending}
            columns={columns}
            slots={{
              toolbar: CustomToolbar, // Use the custom toolbar as a slot
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};


export default Settled;
