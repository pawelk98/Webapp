const config = require('./config');
const express = require('express');
const app = express();
const Dialer = require('dialer').Dialer;
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');

const server = app.listen(3000, () => {
   console.log('app listening on port 3000');
});

Dialer.configure(config.dialer);

const io = new Server(server, {
   path: config.api.prefix + '/socket'
});

io.on("connection", (socket) => {
   console.log('Połączono socket');
   io.emit("status", 5555);
});

app.use(cors());
app.use(bodyParser.json());

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

app.post(config.api.prefix + '/call', async (req, res) => {
   const body = req.body;
   const number1 = body.number;
   const number2 = config.agent_number;
   bridge = await Dialer.call(number1, number2);

   let oldStatus = null
   let interval = setInterval(async () => {
      let currentStatus = await bridge.getStatus();
      if (currentStatus !== oldStatus) {
         oldStatus = currentStatus
         io.emit('status', currentStatus)
      }
      if (currentStatus === 'ANSWERED') {
         clearInterval(interval)
      }
   }, 1000)

   res.json({ success: true })
});

//515876002
//730377686