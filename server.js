const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files from the 'app' directory
app.use(express.static(path.join(__dirname, 'app')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to serve upgrades.json
app.get('/upgrades.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'upgrades.json'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});