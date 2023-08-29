export const categoryColumns = [

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
            <img className="cellImg" src={params.row.imageUrl} alt="avatar" />
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
  ];