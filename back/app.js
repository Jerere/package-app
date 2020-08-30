const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const parser = require('./parser');
const filePath = '/var/lib/dpkg/status'

const port = process.env.PORT || 4000;

try {
  parser(filePath)
    .then(packages => createPaths(packages))
    .catch(err => console.log(err))
}
catch (err) { console.log(err) }

const createPaths = (packages) => {

  // api path
  app.get('/api', (req, res) => {
    try {
      res.json(packages)
    }
    catch (err) {
      res.status(400).json({
        status: 'error',
        message: err.message
      });
    }
  });

  // if build folder exist
  if (fs.existsSync('./build')) {
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/', (res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
  }

  // every other path 
  app.all('*', (req, res) => {
    res.status(404).json({
      status: 'not found',
      message: `Can't find ${req.originalUrl}`
    });
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  });
}