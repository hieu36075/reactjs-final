
export const hotelColumns = [

    { 
      field: "index", headerName: "ID", width: 70,  
    },
    
    {
      field: "name",
      headerName: "Name",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row?.images?.[0]?.url} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
    },
    {
        field: "address",
        headerName: "Address",
        width: 230,
      },
      {
        field: "phoneNumber",
        headerName: "Phone Number",
        width: 230,
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