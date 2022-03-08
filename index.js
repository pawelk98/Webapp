const express = require('express');
const app = express();
const Dialer = require('dialer').Dialer;
const cors = require('cors');
const bodyParser = require('body-parser');

const config = {
   url: 'https://uni-call.fcc-online.pl',
   login: 'login',
   password: 'haslo'
};

Dialer.configure(config);  
app.use(cors());
app.use(bodyParser.json());

app.listen(3000, () => {
   console.log('app listening on port 3000');
});

let bridge = null;

app.get('/call/:number1/:number2', async (req, res) => {
   const number1 = req.params.number1;
   const number2 = req.params.number2;
  
   bridge = await Dialer.call(number1, number2);
   res.json({success: true});
});

app.get('/status', async (req, res) => {
   let status = 'NONE';
   if(bridge != null) {
      status = await bridge.getStatus();
   }
   res.json({success: true, status: status});
});

app.post('/call', async (req, res) => {
   const body = req.body;
   bridge = await Dialer.call(body.number1, body.number2);
   res.json({ success: true })
});