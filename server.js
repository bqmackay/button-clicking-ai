const express = require('express');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route to serve upgrades.json
app.get('/upgrades.json', (req, res) => {
  res.sendFile(__dirname + '/upgrades.json');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});