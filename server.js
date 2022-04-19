const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const apiKey = "bda15ecc32f0300d6bdc415ac718c430";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index", { weather: null, error: null });
});

app.post("/", (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    request(url, (err, response, body) => {
        if (err) {
            res.render("index", { weather: null, error: "Error! Please try again!" });
        } else {
            let weather = JSON.parse(body);
            if (weather.main == undefined) {
                res.render("index", {
                    weather: null,
                    error: "Error! Please try again!",
                });
            } else {
                const kelvinTemp = weather.main.temp;
                const weatherCelcius = Math.floor(kelvinTemp - 273);

                let weatherText = `It's ${weatherCelcius} degrees Celcius in ${weather.name}!`;
                res.render("index", { weather: weatherText, error: null });
            }
        }
    });
});

app.listen(3000, () => {
    console.log("Kode weather listening on port 3000");
});