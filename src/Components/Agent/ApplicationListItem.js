
import React from "react";
import axios from 'axios';

export default class ApplicationListItem extends React.Component{

    constructor(props){
      super(props);
      console.log(this.props.children);
    }

    async accept(){
        console.log('accpeted');

        const body = {
            applicationId : this.props.children.applicationId,
            unitNumber : this.props.children.unitNumber,
            apartmentId : this.props.children.apartmentId
        }

        await axios.post('http://127.0.0.1:8000/acceptApplication', {body}).then((res) => {
            console.log(res.data);
        })

        window.location.reload(false);
    }

    async reject(){
        console.log('rejected');

        await axios.post('http://127.0.0.1:8000/rejectApplication/'+this.props.children.applicationId).then((res) => {
            console.log(res.data);
        })

        window.location.reload(false);
    }

    render(){
      return(
      <div  style={{border:"1px solid black", padding:"10px"}}>
        {this.props ? 
        (<div className="application-list-item">
            <div className="apartment-details">
                <div><b>Apartment Name :</b> {this.props.children.apartmentName}</div>
                <div><b>Agency Name :</b> {this.props.children.agencyName}</div>
                <div><b>Unit Number :</b> {this.props.children.unitNumber}</div>
            </div>
          <div className="user-details">
            <div><b>User's email :</b> {this.props.children.emailId}</div>
            <div><b>User's name : </b>{this.props.children.firstName}</div>
            </div>
            <div>
            <button onClick={this.accept.bind(this)}>Accept</button>
            <button onClick={this.reject.bind(this)}>Reject</button>
          </div>
          </div>):
          <div></div>
        }
        
      </div>
      )
    }
}

