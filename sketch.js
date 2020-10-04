// https://mappa.js.org/docs/getting-started.html

// Options for map
const options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
}

// Create an instance of Leaflet
const mappa = new Mappa('Leaflet');
let myMap;

let canvas;
let albertPositions;


function preload() {
  // Load the data;
}


function setup() {
  canvas = createCanvas(800, 800);

  // Create a tile map and overlay the canvas on top
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // Only redraw the positions when the map change and not every frame
  myMap.onChange(drawPositions);

  // console.log(trackingData)
  trackingData = loadTable('track_points.csv', 'header'); // csv data or tabular data

  fill(70, 203, 31);
  stroke(100);

}

function draw() {

}

function drawPositions() {
  // Clear the canvas
  clear();

  for (let i = 0; i < trackingData.getRowCount(); i++) {
    // Get the lat/lng of each position
    const latitude = Number(trackingData.getString(i, 'x'));
    const longitude = Number(trackingData.getString(i, 'y'));

    const countNumber = Number(trackingData.getString(i, 'track_seg_point_id'));

    // console.log(latitude)
    // console.log(countNumber)

    // Only draw them if the position is inside the current map bounds. We use a
    // Leaflet method to check if the lat and lng are contain inside the current
    // map. This way we draw just what we are going to see and not everything. See
    // getBounds() in http://leafletjs.com/reference-1.1.0.html
    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      // Transform lat/lng to pixel position
      const pos = myMap.latLngToPixel(latitude, longitude);
      console.log(pos)
      // Get the size of the meteorite and map it. 60000000 is the mass of the largest
      // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
      let size = trackingData.getString(i, 'track_seg_point_id');
      console.log(size);
      size = map(countNumber, 558, 1800, 1, 125) + myMap.zoom();
      ellipse(pos.x, pos.y, size, size);
      // console.log(pos.x, pos.y, size)
    }
  }
}


// console.log(trackingData.rows); // rows are in an array of all the rows
// for (let row of trackingData.rows) { // for of loop
// let row = trackingData.getRow(i);
// console.log(row.get('x'));
// console.log(row.get('y'));
