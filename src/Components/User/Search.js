import React from 'react';


class Search extends React.Component {
  
  constructor(props){
    super(props);
  }

  render () {
    return (
      <div id="searchbar">
          <div id="search-menu">
            <form className="search-form" onSubmit={this.props.getUnits.bind(this)}>
                <label>
                  Number of beds:
                  <span> </span>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="0"/>
                    <label className="form-check-label" >All</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1"/>
                    <label className="form-check-label" >1</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2"/>
                    <label className="form-check-label" >2</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="3"/>
                    <label className="form-check-label" >3</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="4"/>
                    <label className="form-check-label" >4</label>
                  </div>
                </label>
                  <br/>
                  <label>
                      zipcode:
                      <span> </span>
                      <input type="number"></input>
                  </label>
                  <br/>
                  <label>
                      Price range:
                      min: <input type="number"></input>
                      <span> </span>
                      max: <input type="number"></input>
                  </label>
                  <br/>
                  <input type="submit" value="submit"/>
            </form>
          </div>
      </div>        
    );
  }
}


export default Search;