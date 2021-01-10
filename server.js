// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//Require body parser to run server and routes
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port , listening);
function listening(){
	console.log("server is running");
	console.log(`server is running on port number ${port}`); 
}

// get route request to return the projectData object 
app.get("/getWeatherData", sendData);
function sendData(req,res){
	res.send(projectData);
};
 // get all data from the local server for the purpose of  UI update
 app.get("/all",getData);
 function getData(req,res){
	 console.log("sending", projectData);
	 res.send(projectData);
 }
 
 // post route to add weather data 
 app.post("/addWeatherData", retrieveData);
 function retrieveData (req,res){
	 let newWeatherData = req.body;
	 //console.log(newWeatherData);
	 //temperature = newWeatherData.temperature
	 let newData = {
	 temperature: newWeatherData.temperature,
	 city:newWeatherData.city,
	 date: newWeatherData.date,
	 userResponse: newWeatherData.userResponse,
	 }
	 projectData.push(newData);
	 console.log("posted data", projectData);

 };
 
 