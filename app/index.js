const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from CI/CD Pipeline using Jenkins, Docker & Kubernetes!');
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
``
