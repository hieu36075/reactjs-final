export const categoryColumns = [

    { 
      field: "index", headerName: "ID", width: 70,  
    },
    
    {
      field: "name",
      headerName: "category",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.imageURL} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "length",
      headerName: "Total",
      width: 230,
    },
  

    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];