import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockDataSettled } from "../../data/mockData";
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
      field:"Name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "BillDate",
      headerName: "Bill Date",
      flex: 1,
    },
    {
      field: "SettlementDate",
      headerName: "Settlement Date",
      flex: 1,
    },
    {
      field: "TransactionValue",
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
          getRowId={(row) => row._id.$oid}
          checkboxSelection
          rows={mockDataSettled}
          columns={columns}
          slots={{
            toolbar: CustomToolbar, // Use the custom toolbar as a slot
          }}
        />
      </Box>
    </Box>
  );
};

export default Settled;
