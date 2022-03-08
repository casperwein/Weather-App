const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const apiKey = "33ad9896c0c74499dad445f2a6c67242";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    // res.render("index.ejs");
    res.render("index", { weather: null, error: null });
});

app.post("/", (req, res) => {
    // let city = "Jakarta";
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
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render("index", { weather: weatherText, error: null });
            }
        }
    });
});

app.listen(3000, () => {
    console.log("Kode weather listening on port 3000");
});