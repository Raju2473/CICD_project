const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from CI/CD Pipeline using Jenkins, Docker & Kubernetes!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
