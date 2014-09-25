var express = require('express');
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
var app = express();
var port = process.env.PORT || 3000;
app.listen(port);

app.use(express.static('public'));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization');
  next();
});

var sendMessage = function(text) {
  //Send an SMS text message
  client.sendMessage({

    to:'+15108472341', // Any number Twilio can deliver to
    from: '+19252939110', // A number you bought from Twilio and can use for outbound communication
    body: text // body of the SMS message

  }, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { // "err" is an error received during the request, if any

      // "responseData" is a JavaScript object containing data received from Twilio.
      // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
      // http://www.twilio.com/docs/api/rest/sending-sms#example-1

      console.log(responseData.from); // outputs "+14506667788"
      console.log(responseData.body); // outputs "word to your mother."
    }
    else {
      console.log(err);
    }
  });
};

app.all('/', function(req, res) {
  res.send('Hey there');
});

app.get('/message/:text', function(req, res){
  var message = req.params.text;
  sendMessage(message);
  res.send('Sending the following message:' + message);
});
