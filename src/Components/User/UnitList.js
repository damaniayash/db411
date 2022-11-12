import UnitGrid from "./UnitGrid.js"
import AgencyGrid from "./AgencyGrid.js"
import React from "react";

export default class UnitList extends React.Component{

    constructor(props){
      super(props);
    }

    render(){
      return(
      <div>
        {this.props.isUnits ? 
          <div id="unitGrid">
            <UnitGrid units = {this.props.units} ></UnitGrid>
          </div>:
          this.props.isAgency ?
          <div id="agencyGrid">
            <h1>Hi</h1>
            <AgencyGrid agencies = {this.props.agencies} ></AgencyGrid>
          </div>:
          <div></div>
        }
        
      </div>
      )
    }
}

