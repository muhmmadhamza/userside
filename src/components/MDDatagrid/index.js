import React from "react";
import MuiPagination from "@mui/material/Pagination";
import {
  gridPageCountSelector,
  DataGrid,
  useGridApiContext,
  useGridSelector,
  GridPagination,
} from "@mui/x-data-grid";

function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="info"
      className={className}
      shape="rounded"
      variant="outlined"
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const MDDataGrid = ({ columns, isLoading, data, id }) => {
  return (
    <DataGrid
      columns={columns}
      rows={isLoading ? [] : data}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      rowSelection={false}
      autoHeight
      pageSizeOptions={[5]}
      disableColumnFilter
      disableColumnMenu
      loading={isLoading}
      getRowId={(row) => row[id]}
      slots={{
        pagination: CustomPagination,
      }}
      sx={{
        "& .MuiDataGrid-columnHeaderTitle": {
          color: "text.main",
        },
        "& .MuiDataGrid-cellContent": {
          color: "text.main",
        },
        "& .MuiDataGrid-columnSeparator": {
          display: "none",
        },
        "& 	.MuiDataGrid-sortIcon": {
          display: "none",
        },
        "& 	.MuiDataGrid-columnHeader:focus": {
          display: "none",
        },
        "& 	.MuiDataGrid-cell:focus": {
          outline: "none",
        },
        width: "100%",
        "&:focus": {
          outline: "none",
        },
        "&.MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-columnSeparator, .MuiDataGrid-iconButtonContainer": {
          display: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          borderBottom: "none",
          borderRadius: "12px",
          fontSize: "1rem",
          textTransform: "uppercase",
        },
        "& .MuiDataGrid-cell": {
          fontSize: "1rem",
        },
        "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within":
          {
            outline: "none",
          },
      }}
    />
  );
};

export default MDDataGrid;
