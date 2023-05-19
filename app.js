const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port =  process.env.PORT || 3000;

const https = require("node:https"); //this to use APIS




/********************/
var dirname = __dirname;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/**********************/


app.get("/", (req, res)=>{

    res.sendFile(dirname+"/index.html");
    
});


app.post("/new", (req, res)=>{
    
    const cityName = req.body.cityName;
    const apiKey = "YOUR API KEY";
    const url = "https://api.openweathermap.org/data/2.5/weather?lang=en&q="+cityName+"&appid="+apiKey+"&units=metric";
    //https.get function call back returns result of the petition
    https.get(url, (response)=>{
      

        //response.on: this metod returns the contains of API format JSON
        response.on("data",(d)=>{
            //process.stdout.write(d);
            const weatherData = JSON.parse(d); //transform from JSON FORMAT to Javascript Object
            console.log("est: "+ d);

           
           
            res.send(weatherData);
        });


    });

});

app.use(express.static(dirname + "/"));


app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});
