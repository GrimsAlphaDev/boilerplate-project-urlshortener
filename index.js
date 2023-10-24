require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


let arrLink = [];

app.post('/api/shorturl', (req, res) => {
  // res.json({
  //   testUrl: req.body.url
  // });
  const regex = /^(http|https):\/\/[^ "]+$/;
  if (regex.test(req.body.url)) {
    // if the url alredy in arrLink display the array
    if (arrLink.includes(req.body.url)) {
      res.json({
        original_url: req.body.url,
        short_url: arrLink.indexOf(req.body.url)
      });
    }

    // insert new map
    arrLink.push({
      original_url: req.body.url,
      short_url: arrLink.length + 1
    });
    
    // crete short url
    res.json({
      original_url: req.body.url,
      short_url: arrLink.length
    });
    
  } else {
    res.json({
      error: 'Invalid Url'
    });
  }

});

app.get('/api/shorturl/:short_url', (req,res) => {
  const short_url = req.params.short_url;
  const original_url = arrLink[short_url - 1].original_url;
  res.redirect(original_url);
});

