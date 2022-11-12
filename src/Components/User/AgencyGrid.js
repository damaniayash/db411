import React, { useState, useMemo} from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const AgencyGrid = (props) => {

 // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
   {field: 'average rating' },
   {field: 'address'},
   {field: 'name'},
   {field: 'agencyid'},
   {field: 'zipcode'},
   {field: 'Number of units rated'}
 ]);

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
     sortable: true,
     filter: true,
     resizable: true,
   }));

   console.log(props.agencies);
 return (
   <div>

     {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
     <div className="ag-theme-alpine" style={{width: '100%', height: 500}}>

       <AgGridReact
           rowData={props.agencies} // Row Data for Rows

           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties

           animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           rowSelection='multiple' // Options - allows click selection of rows
           />
     </div>
   </div>
 );
};

export default AgencyGrid;