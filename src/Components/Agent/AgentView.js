import React from "react";
import axios from 'axios';
import { Form } from "react-router-dom";
import { waitFor } from "@testing-library/react";


class AgentView extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {

        }
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

        await axios.post('http://127.0.0.1:8000/addUnit', { body }).then((res) => {
            if (res.data === "Unit added successfully!"){
                console.log('Unit added');
                var mes = document.getElementsByClassName('addUnit-message');
                mes[0].style.display = 'block';
                mes[0].innerHTML = 'Unit added successfuly';
                
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
                <button onClick={this.addUnitButton.bind(this)}>Add a new unit</button>
                <button onClick={this.updatePriceButton.bind(this)}>Update existing unit/apartment</button>
                <button onClick={this.removeApartmentButton.bind(this)}>Remove an apartment</button>

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