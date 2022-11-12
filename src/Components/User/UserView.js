import React from "react";
import Search from "./Search.js";
import UnitList from "./UnitList.js";
import axios from 'axios';


class UserView extends React.Component{    

    constructor(props){
        super(props);
        this.state = {
            units: []
        }
    }

    async getUnits(event){
        event.preventDefault()
        var beds;
        for(let i=0; i<5; i++){
            if(event.target[i].checked == true){
                beds = event.target[i].value;
                break;
            }
        }
        var zipcode = event.target[6].value;
        var minprice = event.target[7].value;
        var maxprice = event.target[8].value;
        
        console.log(beds)
        var request = "http://127.0.0.1:8000/apt";
        request += "?zipcode="+zipcode;
        if(beds != "0"){
            request += "&bedrooms="+beds;
        }
        request += "&min="+minprice;
        request += "&max="+maxprice
    
        console.log(request);
        await axios.get(request).then( res => {
          this.setState({
            units: res.data
          })
        });
    }

    render() {
        return (
            <div className = "userview">
                <div className = "userviewTitle" >User view</div>
                <div className = "search">
                    <Search 
                        getUnits={this.getUnits.bind(this)}
                    />
                </div>
                <div className = "results">
                    <UnitList 
                        units={this.state.units}
                    />
                </div>
            </div>
        )
    };
}

export default UserView;