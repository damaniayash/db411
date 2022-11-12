import Grid from "./Grid.js"
import React from "react";
import DisplayUnit from "./DisplayUnit.js";

export default class UnitList extends React.Component{

    constructor(props){
      super(props);
    }

    render(){

      return(
      // <div className="listView">
      //   {this.props.units.map((unit)=>{
      //       return (
      //           <DisplayUnit unit={unit}/>
      //       )
      //   })
      //   }
      // </div>

      <div>
        <Grid></Grid>
      </div>

      )
    }
}

