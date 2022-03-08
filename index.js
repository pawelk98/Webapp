const express = require('express');
const app = express();

app.listen(3000, () => {
   console.log('app listening');
});


app.get('/', (req, res) => {
   res.json({success: true});
})

app.get('/call/:status', (req, res) => {
   let id = null;
   const status = req.params.status;
   getRandomId((randomId) => {
       console.log(randomId);
       id = randomId;
   });
   console.log('sending response');
   res.json({'success': true, id: id, status: status})
})

function getRandomId(callback) {
   setTimeout(() => {
       var random = Math.round(Math.random()*10000)
       callback(random);
   }, Math.round(Math.random()*1000))
}

function getPromise() {
   return new Promise((resolve, reject) => {
       const a = Math.random();
       resolve(a);
   })
}


app.get('/promise', (req, res) => {
   getPromise().then((result) => {
       res.json({success: true, result: result});
   })
})


app.get('/promise2', (req, res) => {
   let results = [];
   getPromise()
   .then((result) => {
       results.push(result)
   })
   .then(getPromise)
   .then((result) => {
       results.push(result)
   }).then(() => {
       res.json({success:true, results: results})
   })
})


app.get('/promise3', async (req, res) => {
   let results = [];
   let random1 = await getPromise();
   results.push(random1);
   let random2 = await getPromise();
   results.push(random2);
   res.json({success:true, results: results})
})



