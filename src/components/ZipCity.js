import React, {Component} from 'react';
import "./style.css"
import axios from "axios";
import ReactDOM from 'react-dom';

class ZipCity extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            zip: "10016",
            records: [],            
        }
        this.printAllQueries = this.printAllQueries.bind(this);
    }
    
    componentDidMount(){
        axios
        .get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zip)
        .then((response) =>{
            
            this.setState({records:response.data});            
            this.printAllQueries();
        })
        .catch((err) => console.log(err));        
        
    }

    printAllQueries = () => {        
       
        let output = [];

        output = this.state.records.map(rec => 
        <div className="query-result">
            <h3>
                {rec.City} , 
                {rec.State}
            </h3>         
            <div className="query-data-box">
                <div className="query-data">
                    <li>City: {rec.City}</li>
                    <li>State: {rec.State}</li>
                    <li>Location: ({rec.Lat}, {rec.Long})</li>
                    <li>Population (estimated): {rec.EstimatedPopulation}</li>
                    <li>Total Wages: {rec.TotalWages}</li>
                </div>
            </div>         
        </div>)       
        
        ReactDOM.render(
            output,
            document.getElementsByClassName("results-output")[0]
        );
    }    

    

    render(){
        return (            
            <div className="main">
                    <div className="prompt-line-box">
                        <h2>Zip Code:</h2>
                        <input 
                        className="prompt-line" 
                        type="text" 
                        onChange={(event) => this.setState({ zip: event.target.value })}
                        onKeyPress={(event) => {
                            if(event.key === "Enter") 
                            {
                                this.componentDidMount();
                            }
                        }}
                        placeholder={this.state.zip}
                        />                     
                    </div>   

                    <button
                        className="button-find"
                        onClick={() => {
                            this.componentDidMount();                        
                        }}
                        >
                        Find
                    </button>    
                    <div className="container">
                        <ul className="results-output"></ul> 
                    </div>
                    
                </div>                        
            
        );            
      
    }  
}

export default ZipCity;
