/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "&apikey=10f94f4bf95e64e8334745805a452c6b";
let defaultZipcode =  "70372";

document.getElementById('generate').addEventListener('click',performAction);

function performAction(e){
	
	e.preventDefault();
	console.log("method called");
	const zipcode = document.getElementById('zip').value;
	let userResponse = document.getElementById("feelings").value;

	if(zipcode =="" ){
		alert("enter valid zipcode  ");
	}
	
	getData(baseUrl,zipcode,apiKey)
	.then(function(data){
		if(!(data.cod == "404" || data.cod == "500"))
		{
			// Add data
			temperature = data.main.temp +" °F";
			let city = data.name;
			let date = new Date(data.dt*1000);
			let dateToday = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
			//console.log(dateToday);
			//})
		   postData('http://localhost:8000/addWeatherData', {temperature:temperature, city:city, date: dateToday, userResponse:userResponse})
		   
			//console.log(getData);
			.then(updateUI('http://localhost:8000/all'))
		} 
		else 
		{
			alert(" Please enter valid USA zipcode");
		}
    })
};

// make a get request to the openweatherAPI
const getData = async(baseUrl,zipcode,apiKey)=>{
	
	const res = await fetch(baseUrl+"zip="+zipcode+"&units=imperial"+apiKey)
	try{
		//console.log(baseUrl+"zip="+zipcode+","+countryCode+"&units=imperial"+apiKey);
		const data = await res.json();
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
