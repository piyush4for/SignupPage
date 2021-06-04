//jshint esversion:7
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstname = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.Email;

  // console.log(Fname, Lname, email);
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastName,
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us17.api.mailchimp.com/3.0/lists/38aa5523c7";
  const options = {

    method: "POST",
    auth: "piyush1:8c2739f57c3b9b5c474cd97f3136802d-us178",
  };

  const request = https.request(url, options, function(response) {


    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else {
      res.sendFile(__dirname+ "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });
request.write(jsonData);
request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("server is running");
});

//Api key
//8c2739f57c3b9b5c474cd97f3136802d-us17
//
// list id
// 38aa5523c7
