import React, {Component} from 'react';
import "./style.css"
import axios from "axios";

class ZipCity extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            zip: "10304",
            records: [],
        }

    }
    
    componentDidMount(){
        axios
        .get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zip)
        .then((response) =>{
            
            this.setState({records:response.data});
            console.log(response.data[0]);
        
        })
        .catch((err) => console.log(err));        
        
    }

    

    render(){
        return (
            <>
                <div className="prompt-line-box">
                    <h2>Zip Code: </h2>
                    <input 
                    className="prompt-line" 
                    type="text" 
                    onChange={(event) => this.setState({ zip: event.target.value })}
                    placeholder={this.state.zip}
                    />                     
                </div>   

                <button
                    className="button-find"
                    onClick={() => {
                        this.componentDidMount();
                    }}
                    >
                    FIND
                </button>    

                <ul className="results-output">{
                    this.state.records.map(rec => <div>
                        <h3>
                            {rec.City} , 
                            {rec.State}
                        </h3>                     
                        
                        <li>City: {rec.City}</li>
                        <li>State: {rec.State}</li>
                        <li>Location: ({rec.Lat}, {rec.Long})</li>
                        <li>Population (estimated): {rec.EstimatedPopulation}</li>
                        <li>Total Wages: {rec.TotalWages}</li>
                    </div>)
                }</ul>         
            </>
        );            
      
    }  
}

export default ZipCity;
