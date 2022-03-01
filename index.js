const express = require('express');
const app = express();

app.listen(3000, () => {
   console.log('app listening');
});

app.get('/', (req, res) => {
   res.json({success: true});
})
