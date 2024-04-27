import { Box, useTheme } from "@mui/material";
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

//added imports
const { ethers } = require("ethers");
const config = require("./config");
//added imports ends

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

//new code addedd

async function getPurchasesArray() {
  const provider = new ethers.providers.JsonRpcProvider(config.providerURL);

  const wallet = new ethers.Wallet(config.privateKey, provider);
  const contract = new ethers.Contract(config.contractAddress, config.contractABI, wallet);

  const purchasesArray = await contract.getAllPurchases();
  return purchasesArray;
}

let purchasesArray = null;

try {
  purchasesArray = await getPurchasesArray();

  //for employee login
  purchasesArray = purchasesArray.filter((item) => item.customerID === "EMP001");   //in case of employeelogin add the employeeID from login token


  purchasesArray = purchasesArray = purchasesArray.map((row, index) => ({ ...row, id: index }));
  console.log(purchasesArray);
} catch (error) {
  console.error("Error:", error);
}


//new code ends


const Settled = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
  ]
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
          getRowId={(row) =>row.id}
          checkboxSelection
          rows={purchasesArray}
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
