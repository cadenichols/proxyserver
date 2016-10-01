const PORT = process.env.PORT || 3000;

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const morgan = require('morgan')
const cors = require('cors')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  let { url } = req.query;

  if(!url) {
    return res.status(400).send({
      error: 'Missing url!  Attach url to request as query parameter.  Example: ?url=example.com'
    })
  }

  request.get(url, (err, response, body) => {
    if(err) return res.status(400).send(err);

    let data = JSON.parse(body);

    res.send(data);
  });
})

app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`)
});
