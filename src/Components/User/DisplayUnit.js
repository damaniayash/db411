import React from "react";


export default class DisplayUnit extends React.Component{

    render(){
        return(
        <div>        
            <div className="searchCardDetails">
                <h1>{this.props.unit.address}</h1>
                
            </div>
        </div>
      )
    }
}

  