import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const Grid = (props) => {

 // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
   {field: 'apartmentname', filter: true},
   {field: 'address', filter: true},
   {field: 'availablity', filter: true},
   {field: 'description', filter: true},
   {field: 'numbedrooms', filter: true},
   {field: 'rentalcost', filter: true},
   {field: 'agencyid', filter: true},
   {field: 'zipcode', filter: true}
 ]);

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
     sortable: true
   }));

   console.log(props.units);
 return (
   <div>

     {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
     <div className="ag-theme-alpine" style={{width: '100%', height: 500}}>

       <AgGridReact
           rowData={props.units} // Row Data for Rows

           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties

           animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           rowSelection='multiple' // Options - allows click selection of rows
           />
     </div>
   </div>
 );
};

export default Grid;