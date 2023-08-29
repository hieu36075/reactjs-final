import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Skeleton } from "@mui/material";

const Datatable  = ({data, Columns, actionColumn, title, meta, onPageChange, isLoading}) => {
  // console.log(meta)

    const location = useLocation();
    const pathname = location.pathname.split("/")[2];
    if (!meta || !data) {
      return <h1>loading</h1>
    }
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        <Link to={`/admin/${pathname}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={Columns.concat(actionColumn)}
        // pageSize={parseInt(meta?.perPage)}
        // page={parseInt(meta?.page)}
        loading={!isLoading}
        rowCount={parseInt(meta?.totalItems)}
        paginationMode="server"
        pageSizeOptions={[5]}
        paginationModel={{page:parseInt(meta?.page) -1 || 0 ,pageSize:5}}
        onPaginationModelChange={(model) => {
          onPageChange(model.page + 1); // Bấm "Next Page" sẽ tăng page lên 1
        }}
      />
    </div>
  );
};

export default Datatable ;