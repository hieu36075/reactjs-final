
export const userColumns = [

    { 
      field: "index", headerName: "ID", width: 70,  
    },
    
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    
    {
      field: "role.name",
      headerName: "Role",
      width: 100,
      valueGetter: (params) => params.row.role.name
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        const statusText = params.row.isActive ? "Active" : "Inactive";
        return (
          <div className={`cellWithStatus ${params.row.isActive ? "active" : "inactive"}`}>
            {statusText}
          </div>
        );
      },
    },
  ];