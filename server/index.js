const express = require('express');
const app = express();
const path = require('path');

// Correct the path to serve static files from the build folder
app.use(express.static(path.join(__dirname, '../client/build')));

// Correct the catchall handler to send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// A simple API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Choose the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


// // index.js
// const express = require('express');
// const app = express();

// const path = require('path');

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, '../client/public')));

// // The "catchall" handler: for any request that doesn't
// // match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'../client/build'));
// });

// // A simple API route
// app.get('/api/hello', (req, res) => {
//   res.json({ message: 'Hello from server!' });
// });

// // Choose the port and start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });
