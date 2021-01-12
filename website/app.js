/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "&apikey=10f94f4bf95e64e8334745805a452c6b";
//let countryCode = "DE";
let defaultZipcode =  "70372";
// Create a new date instance dynamically with JS
let d = new Date();
let dayDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
document.getElementById('generate').addEventListener('click',performAction);
function performAction(e){
	e.preventDefault();
	console.log("method called");
	const zipcode = document.getElementById('zip').value;
	let userResponse = document.getElementById("feelings").value;
	//console.log(userResponse);
	//getData(baseUrl,zipcode,apiKey);
	if(zipcode =="" ){
		alert("enter valid zipcode  ");
	}
	getData(baseUrl,zipcode,apiKey)
	.then(function(data){
    // Add data
    temperature = data.main.temp +" °F";
	let city = data.name;
	//console.log(city);
	//console.log(temperature);
	//console.log(userResponse);
	//console.log(dayDate);
	let date = new Date(data.dt*1000);
	let dateToday = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
	//console.log(dateToday);
	//})
   postData('http://localhost:8000/addWeatherData', {temperature:temperature, city:city, date: dateToday, userResponse:userResponse});
   })
    //console.log(getData);
	.then(updateUI('http://localhost:8000/all'))
};
// make a get request to the openweatherAPI
const getData = async(baseUrl,zipcode,apiKey)=>{
	/*if (!zipcode)
	{
		zipcode = defaultZipcode;
	}*/
	const res = await fetch(baseUrl+"zip="+zipcode+"&units=imperial"+apiKey)
	try{
		//console.log(baseUrl+"zip="+zipcode+","+countryCode+"&units=imperial"+apiKey);
		const data = await res.json();
		//let tempf = data.main.temp;
		console.log("open weather map data: ", data);
		//converting fareheit to degree celsius
		//var tempC =((tempf - 32) * 5 / 9).toFixed(2);
		//console.log(tempC+" °C");
		//return tempC;
		return data;
	    }catch(error){
		console.log("error", error);
	}
}
// make a post request function to the local server
const postData = async(url ='', data={}) => {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers:{
			'Content-Type':'application/json',
		},
		body: JSON.stringify(data),
	});
	try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}
//updating UI 
const updateUI = async (url='') => {
	const request = await fetch(url)
	try{
		const allData = await request.json()
		console.log("allData" ,allData);
		
		/*
		document.getElementById("date").innerHTML = "Date:  " + allData[allData.length-1].date;
		document.getElementById("temp").innerHTML = "Temperature:  "+allData[allData.length-1].temperature;
		document.getElementById("city").innerHTML = "City:  "+allData[allData.length-1].city;
		if(allData[allData.length-1].userResponse ==""){
			document.getElementById("content").innerHTML = "You Feel:  " +allData[allData.length-1].userResponse + "-";
		  }else{
		document.getElementById("content").innerHTML = "You Feel:  " +allData[allData.length-1].userResponse + "!";
		} */
		
		
		
		document.getElementById("date").innerHTML = "Date:  " + allData.date;
		document.getElementById("temp").innerHTML = "Temperature:  "+allData.temperature;
		document.getElementById("city").innerHTML = "City:  "+allData.city;
		if(allData.userResponse ==""){
			document.getElementById("content").innerHTML = "You Feel:  " +allData.userResponse + "-";
		  }else{
		document.getElementById("content").innerHTML = "You Feel:  " +allData.userResponse + "!";
		}
		
		document.querySelector('.entry').style.display = "block";
	}catch(error){
		console.log("error occured", error);
	}
	
}
//console.log("dateis" + new Date(1610215980*1000));