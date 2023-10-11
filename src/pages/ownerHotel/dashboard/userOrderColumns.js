
export const userOrderColumns = [

    { 
      field: "index", headerName: "ID", width: 70,  
    },
    
    {
      field: "fullName",
      headerName: "Name",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.avatarUrl} alt="avatar" />
            {params.row.fullName}
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
        field: "phoneNumber",
        headerName: "Phone",
        width: 230,
    },
    
    // {
    //   field: "role.name",
    //   headerName: "Role",
    //   width: 100,
    //   valueGetter: (params) => params.row.role.name
    // },
    {
      field: "isActive",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        const statusText = params.row.orderStatus 
        return (
          <div className={`cellWithStatus ${params.row.orderStatus}`}>
            {statusText}
          </div>
        );
      },
    },
  ];