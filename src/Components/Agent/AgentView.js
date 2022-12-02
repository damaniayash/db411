import React from "react";
import axios from 'axios';
import { Form, useParams } from "react-router-dom";
import { waitFor } from "@testing-library/react";
import ApplicationListItem from "./ApplicationListItem.js";



class AgentView extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {
            applications: [],
            agent_id : 0
        }
    }

    

    async showHomePage(){
        console.log('home page');
        document.getElementsByClassName('addUnit-message')[0].style.display = 'none';
        var addUnitForm = document.getElementsByClassName('add-unit-form');
        addUnitForm[0].style.display = "none";
        var updatePriceForm = document.getElementsByClassName('update-price-form');
        updatePriceForm[0].style.display = "none";
        var removeAptForm = document.getElementsByClassName('remove-apt-form');
        removeAptForm[0].style.display = "none";
        document.getElementsByClassName('removeApt-message')[0].style.display = 'none';

        document.getElementsByClassName('show-list')[0].style.display = 'block';


        var agency_id = this.state.agent_id; 
        console.log(agency_id);

        //api call to get data
        await axios.get('http://127.0.0.1:8000/submittedApplications/'+agency_id).then((res) => {
            if(Array.isArray(res.data)){
                this.setState({applications : res.data});
            }
        })

        console.log(this.state.agent_id);

        //process data and store in state variable

    }

    async componentDidMount(){

        const id  = this.props;
        console.log(id)

        await this.setState({agent_id : id.agentId})

        this.showHomePage();

        

    }

    updatePriceButton(){
        document.getElementsByClassName('addUnit-message')[0].style.display = 'none';
        var addUnitForm = document.getElementsByClassName('add-unit-form');
        addUnitForm[0].style.display = "none";
        var updatePriceForm = document.getElementsByClassName('update-price-form');
        updatePriceForm[0].style.display = "block";
        var removeAptForm = document.getElementsByClassName('remove-apt-form');
        removeAptForm[0].style.display = "none";
        document.getElementsByClassName('removeApt-message')[0].style.display = 'none';
        document.getElementsByClassName('show-list')[0].style.display = 'none';
    }
    

    addUnitButton(){
        document.getElementsByClassName('updatePrice-message')[0].style.display = 'none';
        var updatePriceForm = document.getElementsByClassName('update-price-form');
        updatePriceForm[0].style.display = "none";
        var addUnitForm = document.getElementsByClassName('add-unit-form');
        addUnitForm[0].style.display = "block";
        var removeAptForm = document.getElementsByClassName('remove-apt-form');
        removeAptForm[0].style.display = "none";
        document.getElementsByClassName('removeApt-message')[0].style.display = 'none';
        document.getElementsByClassName('show-list')[0].style.display = 'none';
    }

    removeApartmentButton(){
        document.getElementsByClassName('addUnit-message')[0].style.display = 'none';
        document.getElementsByClassName('updatePrice-message')[0].style.display = 'none';
        var addUnitForm = document.getElementsByClassName('add-unit-form');
        addUnitForm[0].style.display = "none";
        var updatePriceForm = document.getElementsByClassName('update-price-form');
        updatePriceForm[0].style.display = "none";

        var removeAptForm = document.getElementsByClassName('remove-apt-form');
        removeAptForm[0].style.display = "block";
        document.getElementsByClassName('show-list')[0].style.display = 'none';
    }

    async addUnitSubmit(event){
        event.preventDefault();
        
        var unitNumber = event.target[1].value;
        var apartmentId = event.target[0].value;
        var area = event.target[2].value;
        var numBedroom = event.target[3].value;
        var rent = event.target[4].value;

        const body = {
            unitNumber : unitNumber,
            apartmentId : apartmentId,
            area : area,
            numBedrooms : numBedroom, 
            rentalCost : rent
        }
        console.log(body);
        await axios.post('http://127.0.0.1:8000/addUnit', { body }).then((res) => {
            if (res.data === "Unit added successfully!"){
                console.log('Unit added');
                var mes = document.getElementsByClassName('addUnit-message');
                mes[0].style.display = 'block';
                mes[0].innerHTML = 'Unit added successfuly';
                
            }
            else if(res.data.includes("Duplicate entry")){
                console.log(res.data);
                var mes = document.getElementsByClassName('addUnit-message');
                mes[0].style.display = 'block';
                mes[0].innerHTML = 'Unit already exists.';
            }
            else {
                console.log('Some error : ' + res.data);
                var mes = document.getElementsByClassName('addUnit-message');
                mes[0].style.display = 'block';
                mes[0].innerHTML = 'Unknown error. Please check logs.';
            }
        })

    }


    async updatePrice(event){
        event.preventDefault();

        var apartmentId = event.target[0].value;
        var numBedroom = event.target[1].value;
        var rent = event.target[2].value;

        const body = {
            apartmentId : apartmentId,
            numBedrooms : numBedroom, 
            rentalCost : rent
        }

        await axios.post('http://127.0.0.1:8000/updateUnitCost', { body }).then((res) => {
            if (res.data === "Rental cost updated successfully!"){
                // console.log('Unit added');
                var mes = document.getElementsByClassName('updatePrice-message');
                mes[0].style.display = 'block';
                mes[0].innerHTML = 'Rental cost updated successfully!';
                
            }
            else {
                console.log('Some error : ' + res.data);
                var mes = document.getElementsByClassName('updatePrice-message');
                mes[0].style.display = 'block';
                mes[0].innerHTML = 'Unknown error. Please check logs.';
            }
        })
    }

    async removeApartment(event){
        event.preventDefault();
        var apartmentId = event.target[0].value;

        await axios.delete('http://127.0.0.1:8000/removeApartment/'+apartmentId).then((res) => {
            if(res.data === "Apartment removed successfully!"){
                var mes = document.getElementsByClassName('removeApt-message');
                mes[0].style.display = 'block';
                mes[0].innerHTML = 'Apartment removed successfully!';
            }
            else {
                console.log(res);
                var mes = document.getElementsByClassName('removeApt-message');
                mes[0].style.display = 'block';
                mes[0].innerHTML = 'Unknown error. please check logs';
            }
        });
    }

    render() {
        return (
            <>
                <h1>Agent view</h1>
                <button onClick={this.showHomePage.bind(this)}>Home Page</button>
                <button onClick={this.addUnitButton.bind(this)}>Add a new unit</button>
                <button onClick={this.updatePriceButton.bind(this)}>Update existing unit/apartment</button>
                <button onClick={this.removeApartmentButton.bind(this)}>Remove an apartment</button>

                <div class="show-list">
                    <h1>Pending submissions</h1>
                    {
                        this.state.applications.map((x)=>{
                            return (<ApplicationListItem>{x}</ApplicationListItem>)
                        })
                    }
                </div>

                <form class="form-horizontal add-unit-form" style={{display:"none"}} onSubmit={this.addUnitSubmit}>
                    <div class="form-group">
                    <label class="control-label col-sm-2">Select Apartment:</label>
                    <div class="col-sm-5" >
                        <input class="form-control" type="number"></input>
                        </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2">Enter Unit number:</label>
                    <div class="col-sm-5" >
                        <input class="form-control" type="number"></input>
                        </div>
                    </div>
                    
                    <div class="form-group">
                    <label class="control-label col-sm-2">Enter Area in sqft:</label>
                    <div class="col-sm-5" >
                        <input class="form-control" type="number"></input>
                        </div>
                    </div>

                    <div class="form-group">
                    <label class="control-label col-sm-2">Enter number of bedrooms:</label>
                    <div class="col-sm-5" >
                        <input class="form-control" type="number"></input>
                        </div>
                    </div>

                    <div class="form-group">
                    <label class="control-label col-sm-2">Enter rental cost:</label>
                    <div class="col-sm-5" >
                        <input class="form-control" type="number"></input>
                        </div>
                    </div>

                    <input type="submit" value="submit"/>
                </form>
                <h3 style={{display:"none"}} class="addUnit-message"></h3>

                <form class="form-horizontal update-price-form" style={{display:"none"}} onSubmit={this.updatePrice}>
                    <div class="form-group">
                    <label class="control-label col-sm-2">Enter Apartment id:</label>
                    <div class="col-sm-5" >
                        <input class="form-control" type="number"></input>
                        </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2">Enter number of bedrooms:</label>
                    <div class="col-sm-5" >
                        <input class="form-control" type="number"></input>
                        </div>
                    </div>

                    <div class="form-group">
                    <label class="control-label col-sm-2">Enter updated rental cost:</label>
                    <div class="col-sm-5" >
                        <input class="form-control" type="number"></input>
                        </div>
                    </div>

                    <input type="submit" value="submit"/>
                </form>
                <h3 style={{display:"none"}} class="updatePrice-message"></h3>


                <form class="form-horizontal remove-apt-form" style={{display:"none"}} onSubmit={this.removeApartment}>
                <div class="form-group">
                    <label class="control-label col-sm-2">Enter Apartment id:</label>
                    <div class="col-sm-5" >
                        <input class="form-control" type="number"></input>
                        </div>
                    </div>
                    
                    <input type="submit" value="submit"/>
                </form>
                <h3 style={{display:"none"}} class="removeApt-message"></h3>
            </>
        )
    };
}


export default AgentView;