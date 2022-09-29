import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';

// function QuickSearchToolbar() {
//   return (
//     <Box 
//       sx={{
//         p: 0.5,
//         pb: 0,
//         marginLeft:"50%"
//       }}
//     >
//       <GridToolbarQuickFilter />
//     </Box>
//   );
// }
const columns = [
  { field: 'id', headerName: 'ID', width: 170 },
  { field: 'ename', headerName: 'NAME', width: 170 },
  { field: 'key', headerName: 'KEY', width: 170 },
];

const QuickFilteringCustomLogic = () => {

  const [row, setRow] = useState([]);
  const [data,setData] = useState([])



  useEffect(() => {
    axios.get("http://192.168.3.113:8080/QuestyTasks/queryOptFull.jsp")
      .then(e => setRow(e.data))
  }, [])

  return (
    <Box sx={{ height: 400, width: "50%" }}>
      <DataGrid
        rows={row}
        columns={columns}
        //components={{ Toolbar: QuickSearchToolbar }}
        components={{ Toolbar: GridToolbar }}
        pageSize={5} rowsPerPageOptions={[2, 5, 7]}
      />
    </Box>
  );
}

export default QuickFilteringCustomLogic;
