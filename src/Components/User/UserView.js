import React from "react";
import Search from "./Search.js";
import UnitList from "./UnitList.js";
import axios from 'axios';


class UserView extends React.Component{    

    constructor(props){
        super(props);
        this.state = {
            units: [],
            agencies: [],
            isAgency: false,
            isUnits: false
        }
    }

    async getBestAgency(event){
        event.preventDefault()
        this.setState({
            isUnits:false,
            isAgency:true
        })

        var minArea = event.target[0].value;
        var maxArea = event.target[1].value;
        
        var request = "http://127.0.0.1:8000/area";
        request += "?min="+minArea;
        request += "&max="+maxArea;
    
        console.log(request);
        await axios.get(request).then( res => {
          this.setState({
            agencies: res.data
          })
        });
        console.log("agency");
        console.log(this.state.agencies);
    }

    async getCheapestUnits(event){
        var beds;
        for(let i=0; i<5; i++){
            if(event.target[i].checked == true){
                beds = event.target[i].value;
                break;
            }
        }
        var zipcode = event.target[5].value;
        
        var request = "http://127.0.0.1:8000/getCheapestApartments";
        request += "?zipcode="+zipcode;
        if(beds != null && beds != undefined && beds != "0"){
            request += "&bedrooms="+beds;
        }
    
        console.log(request);
        await axios.get(request).then( res => {
          this.setState({
            units: res.data
          })
        });
    }

    async getUnits(event){
        var beds;
        for(let i=0; i<5; i++){
            if(event.target[i].checked == true){
                beds = event.target[i].value;
                break;
            }
        }
        var zipcode = event.target[5].value;
        var minprice = event.target[6].value;
        var maxprice = event.target[7].value;

        var request = "http://127.0.0.1:8000/apt";
        request += "?zipcode="+zipcode;
        if(beds != null && beds != undefined && beds != "0"){
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

    getData(event){
        event.preventDefault()
        console.log(event.nativeEvent.submitter.name);
        var submitType = event.nativeEvent.submitter.name;
        if (submitType == 'searchAll') {
            this.setState({
                isUnits:true,
                isAgency:false
            })
            this.getUnits(event);
        } else if (submitType == 'cheapestApartments') {
            this.setState({
                isUnits:true,
                isAgency:false
            })
            this.getCheapestUnits(event);
        }
        
    }

    render() {
        return (
            <div className = "userview">
                <div className = "userviewTitle" >User view</div>
                <div className = "search">
                    <Search 
                        getData={this.getData.bind(this)}
                        getBestAgency={this.getBestAgency.bind(this)}
                    />
                </div>
                <div className = "results">
                    <UnitList 
                        units={this.state.units}
                        agencies={this.state.agencies}
                        isAgency={this.state.isAgency}
                        isUnits={this.state.isUnits}
                    />
                </div>
            </div>
        )
    };
}

export default UserView;