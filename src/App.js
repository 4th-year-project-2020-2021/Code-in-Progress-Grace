import React from 'react';

export default class Data extends React.Component{

    constructor (props){
      super(props);
      this.state = {
        items: [],
        isLoaded:false,
      }
    }

    componentDidMount(){

      // Creating api call using fetch
      //fetch('https://jsonplaceholder.typicode.com/users')
      //fetch('https://api.covid19api.com/summary')
      fetch('https://api.covid19api.com/dayone/country/south-africa/status/confirmed/live')
        .then(res => res.json())
        .then(json => {
           this.setState ({
              isLoaded: true,
              items: json,
          })
        });
    }

    render() {

      var {isLoaded, items} = this.state;

      if(!isLoaded){
        return <div>Loading...</div>;
      }

      else {
        return (
          <div className="App">
            
            <ul>
                {items.map(item => (
                  
                  <li key={item.Country}>
                    Country: {item.Country} - Cases: {item.Cases} - Date: {item.Date}
                  </li>
              ))}
          </ul>
        </div>
      );
    }
  }
}