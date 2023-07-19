import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Datatable  = ({data, Columns, actionColumn}) => {
    const location = useLocation();
    const pathname = location.pathname.split("/")[2];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to={`/admin/${pathname}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={Columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Datatable ;