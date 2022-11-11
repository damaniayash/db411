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

    addUnitButton(){
        var addUnitForm = document.getElementsByClassName('add-unit-form');
        console.log(addUnitForm);
        addUnitForm[0].style.display = "block";
    }

    async addUnitSubmit(event){
        
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

        await axios.post('http://127.0.0.1:8000/addUnit', { body }).then( res => {
            console.log(res);
        });

        event.preventDefault();
    }

    render() {
        return (
            <>
                <h1>Agent view</h1>
                <button onClick={this.addUnitButton.bind(this)}>Add a new unit</button>
                <button>Update existing unit/apartment</button>

                <form class="add-unit-form" style={{display:"none"}} onSubmit={this.addUnitSubmit}>
                    <label>
                        Select Apartment:
                        <input type="number"></input>
                    </label>
                    <label>
                        New Unit Number:
                        <input type="number"></input>
                    </label>
                    
                    <label>
                        Area :
                        <input type="number"></input>
                    </label>

                    <label>
                        Number of bedrooms:
                        <input type="number"></input>
                    </label>

                    <label>
                        Rental cost:
                        <input type="number"></input>
                    </label>

                    <input type="submit" value="submit"/>
                </form>

            </>
        )
    };
}


export default AgentView;