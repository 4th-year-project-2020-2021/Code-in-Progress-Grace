import mapboxgl from 'mapbox-gl';
import "https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js";

const mapbox_token = "pk.eyJ1IjoiZ3JhY2VrZWFuZSIsImEiOiJja2hmMXZic2MwbGNwMzVsNjVtZ3B1bXpiIn0.sA3v-R0YTud3qMVCET5Q2A";

// Initializing the map
mapboxgl.accessToken = mapbox_token;

var map = new mapboxgl.Map({
container: "map",
style: "mapbox://styles/mapbox/dark-v10", 
zoom: 1.5,
center: [0, 20]
});

fetch("/get-latest.json")
  .then(response => response.json())
  .then(data => {
  
    // Pulling places and reports key from data object
    const {places, reports} = data;

    // Filter reports - only return results that has hide = false
    reports
    .filter(report => !report.hide)
    // Looping over reports using forEach()
    .forEach(report => {
      // Reading in data that I want (infected, placeId)
      const { infected, placeId } = report;
      // Using places array and calling find method 
      // Searching all the places until it finds the first string match
      // where place.id = placeId from report
      const currentPlace = places.find(place => place.id === placeId);

      // Logging results - to get a better understanding 
      // Easier to view going from arrays to objects
      console.log(infected, currentPlace);

    });
  });