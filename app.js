const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.urlencoded({extended : "true"}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    const query = req.body.cityname;
    var apiid = process.env.API_ID;
    var lnk = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiid +"&units=metric";
    https.get(lnk, function(response){

        response.on("data", function(data){
            var weatherData = JSON.parse(data);
            var temperature = weatherData.main.temp;
            var weatherDescription = weatherData.weather[0].description;
            var weathericon = weatherData.weather[0].icon;

            var imagelink = "http://openweathermap.org/img/wn/" + weathericon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature at " + query + " is currently " + temperature + " degrees celcius</h1>");
            res.write("<img src=" + imagelink +">")
            res.send();
        });
    });
});

app.listen(3000, function(){
    console.log("The server is running on port 3000");
});