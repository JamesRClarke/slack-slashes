var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
})

app.post("/dic", function(req, res) {
    console.log(req.body)
  switch (req.body.text.toLowerCase().trim()) {
    case "yes":
          var response = `*URGENT PLEASE RESPOND * I don't want to disturb you, but I need to talk, let me know when I can come over please?  *URGENT PLEASE RESPOND *`;
      break;
    default:
          var response = `I don't want to disturb you but I need to talk, let me know when I can come over please?`;
      break;
  }

  res.send(response);
});

var lunches = {
    weekday: ["Fuckoffee Soup", "Petit Bleu", "Franco Manco (Takeaway)", "Sainsburys", "Salad Place", "Arancini Brothers", "itsu"],
    friday_feeling: ["Vineyard", "Pizza Pilgrims", "Franco Manco (Takeaway)",  "Lets get Millered (at Millers", "Kings Arms", "Cheeky Nandos", "The Rose", "Patty and Bun"]
}

function chooseRandom(options) {
    return `*${options[Math.floor(Math.random() * options.length)]}*`;
}

app.post('/lunch', function (req, res) {
    var response;
    var options = lunches.weekday;
    console.log(req.body.text.toLowerCase().trim());
    if (req.body.text.toLowerCase().trim() === "cheeky") {
        response = "Well, I guess its a *Nandos* then ?";
    } else if (req.body.text.toLowerCase().trim() === "ff") {
       options = options
          .concat(lunches.friday_feeling)
          .concat(lunches.friday_feeling);
          console.log(options)
        response = chooseRandom(options);
    } else {
        response = chooseRandom(options);
    }
    console.log(response);

    res.send(response);
});

app.listen(3000, function() {
  console.log("Started on PORT 3000");
});
