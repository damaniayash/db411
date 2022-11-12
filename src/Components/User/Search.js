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
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="0"/>
                    <label class="form-check-label" for="inlineRadio1">All</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1"/>
                    <label class="form-check-label" for="inlineRadio1">1</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2"/>
                    <label class="form-check-label" for="inlineRadio2">2</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="3"/>
                    <label class="form-check-label" for="inlineRadio3">3</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="4"/>
                    <label class="form-check-label" for="inlineRadio4">4</label>
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