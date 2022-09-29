import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
}

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

const getApplyFilterFnSameYear = (value) => {
  if (!value || value.length !== 4 || !/\d{4}/.test(value)) {
    // If the value is not a 4 digit string, it can not be a year so applying this filter is useless
    return null;
  }
  return (params) => {
    return params.value.getFullYear() === Number(value);
  };
};

 const QuickFilteringCustomLogic = () => {
  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () =>
      data.columns
        .filter((column) => VISIBLE_FIELDS.includes(column.field))
        .map((column) => {
          if (column.field === 'dateCreated') {
            return {
              ...column,
              getApplyQuickFilterFn: getApplyFilterFnSameYear,
            };
          }
          if (column.field === 'name') {
            return {
              ...column,
              getApplyQuickFilterFn: undefined,
            };
          }
          return column;
        }),
    [data.columns],
  );

  return (
    <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        {...data}
        columns={columns}
        components={{ Toolbar: QuickSearchToolbar }}
      />
    </Box>
  );
}
export default QuickFilteringCustomLogic;












































// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   NavLink,
//   Switch
// } from "react-router-dom";
// import { loadCSS } from "fg-loadcss";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { CSVLink, CSVDownload } from "react-csv";
// import styles from "./App.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCoffee,
//   faListAlt,
//   faPlus,
//   faFileDownload
// } from "@fortawesome/free-solid-svg-icons";
// import Form from "react-bootstrap/Form";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import axios from "axios";

// import DataTable from "react-data-table-component";

// class App extends React.Component {
//   constructor() {
//     super();

//     this.columns = [
//       {
//         name: "#",
//         selector: "SNO",
//         sortable: true
//       },
//       {
//         name: "Document UID",
//         selector: "docCategoryUID",
//         sortable: true
//       },
//       {
//         name: "Document Type Name",
//         selector: "docCategoryName",
//         sortable: true
//       },
//       {
//         name: "Category UID",
//         selector: "docCategoryUID",
//         sortable: true
//       },
//       {
//         name: "Category Name",
//         selector: "docCategoryName",
//         sortable: true
//       },
//       {
//         name: "Naming Conventions",
//         selector: "docCategoryName",
//         sortable: true
//       },
//       {
//         name: "Active",
//         button: true,
//         cell: (row) => (
//           <Form.Check
//             type="switch"
//             id="custom-switch"
//             checked={row.active}
//             disabled
//           />
//         )
//       },
//       {
//         name: "Action",
//         button: true,
//         cell: (row) => (
//           <a to={"/edit-document-category/" + row.docCategoryUID} exact>
//             Edit
//           </a>
//         )
//       }
//     ];
//     this.state = { original_rows: [], rows: [], search: "" };
//     this.columns_data_for_export = this.columns
//       .slice(0, this.columns.length - 1)
//       .map((d) => d.name);
//     this.rows_data_for_export = this.state.rows.map((d1) =>
//       this.columns
//         .slice(0, this.columns.length - 1)
//         .map((d2) => d2.selector)
//         .map((d3) => d1[d3])
//     );
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleKeyDown = this.handleKeyDown.bind(this);
//     this.do_search = this.do_search.bind(this);
//     this.download_pdf = this.download_pdf.bind(this);
//   }

//   componentDidMount() {
//     axios({
//       method: "get",
//       url: "http://localhost:8080/documentCategory/getAll",
//       data: {}
//     }).then(
//       (response) => {
//         let data = response.data.map((currentValue, Index) => {
//           currentValue.SNO = Index + 1;
//           return currentValue;
//         });
//         console.log(data);
//         this.setState({ original_rows: data, rows: data });
//       },
//       (error) => {
//         console.log(error);
//         let data = [
//           {
//             docCategoryUID: 33,
//             docCategoryName: "docate1",
//             createdOn: "2020-01-01T00:00:00.000+00:00",
//             createdBy: "noname",
//             active: 0
//           },
//           {
//             docCategoryUID: 60,
//             docCategoryName: "doccat2",
//             createdOn: null,
//             createdBy: null,
//             active: 0
//           },
//           {
//             docCategoryUID: 61,
//             docCategoryName: "docate123",
//             createdOn: "2020-01-02T00:00:00.000+00:00",
//             createdBy: "noname",
//             active: 0
//           },
//           {
//             docCategoryUID: 76,
//             docCategoryName: "dc1",
//             createdOn: "1970-01-01T00:00:02.000+00:00",
//             createdBy: "dc2",
//             active: 0
//           }
//         ];
//         data = data.map((currentValue, Index) => {
//           currentValue.SNO = Index + 1;
//           return currentValue;
//         });
//         this.setState({ original_rows: data, rows: data });
//       }
//     );

//     const node = loadCSS(
//       "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
//       document.querySelector("#font-awesome-css")
//     );

//     return () => {
//       node.parentNode.removeChild(node);
//     };
//   }

//   handleInputChange(event) {
//     this.setState({ search: event.target.value });
//   }

//   handleKeyDown(event) {
//     if (event.key === "Enter") {
//       this.do_search();
//     }
//   }

//   do_search() {
//     const temp_rows = this.state.original_rows.filter(
//       (e) => JSON.stringify(e).indexOf(this.state.search) >= 0
//     );
//     this.setState({ rows: temp_rows });
//   }

//   download_pdf() {
//     const doc = new jsPDF();

//     const temp_rows = this.state.rows.map((d1) =>
//       this.columns
//         .slice(0, this.columns.length - 1)
//         .map((d2) => d2.selector)
//         .map((d3) => d1[d3])
//     );
//     doc.autoTable({
//       head: [this.columns_data_for_export],
//       body: temp_rows
//     });
//     console.log(this.columns_data_for_export, temp_rows);
//     doc.save("client_list.pdf");
//   }

//   render() {
//     return (
//       <div className={styles.pageContainer}>
//         <p className={styles.pageHeading}>Document Type List</p>
//         <div className={styles.pageBox}>
//           <Row className={styles.marginBottom1}>
//             <Col md={4}>
//               <Form.Control
//                 type="text"
//                 placeholder="Search"
//                 onChange={this.handleInputChange}
//                 onKeyDown={this.handleKeyDown}
//               />
//             </Col>
//             <Col md={8}>
//               <div className={styles.displayFlex}>
//                 <a to="/add-document-category" exact className={styles.addLink}>
//                   <Button
//                     variant="success"
//                     className={`${styles.marginRight} ${styles.primaryBtn}`}
//                   >
//                     <FontAwesomeIcon
//                       icon={faPlus}
//                       className={styles.plusIcon}
//                     />{" "}
//                     Add Document Type
//                   </Button>
//                 </a>
//                 <Button variant="primary" className={styles.primaryBtn}>
//                   <FontAwesomeIcon
//                     icon={faFileDownload}
//                     className={styles.plusIcon}
//                   />{" "}
//                   <CSVLink
//                     data={this.rows_data_for_export}
//                     headers={this.columns_data_for_export}
//                     filename={"client_list.csv"}
//                   >
//                     Excel
//                   </CSVLink>
//                 </Button>
//                 <Button
//                   variant="primary"
//                   className={`${styles.marginLeft} ${styles.primaryBtn}`}
//                   onClick={this.download_pdf}
//                 >
//                   <FontAwesomeIcon
//                     icon={faFileDownload}
//                     className={styles.plusIcon}
//                   />{" "}
//                   Pdf
//                 </Button>
//               </div>
//             </Col>
//           </Row>
//           <div className={styles.clientContainer_old}>
//             <div className={styles.tableContainer}>
//               <DataTable
//                 title="Client List"
//                 columns={this.columns}
//                 data={this.state.rows}
//                 pagination
//                 striped
//                 dense
//                 noHeader
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
