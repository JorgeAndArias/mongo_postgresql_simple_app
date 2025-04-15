const express = require('express');
const bodyParser = require('body-parser');
const mongoRoutes = require('./mongo');
const postgresRoutes = require('./postgres');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api/mongo', mongoRoutes);
app.use('/api/postgres', postgresRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
