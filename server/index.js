// TODO
const path = require('path');
const express = require('express');
const { ArtRoutes } = require('./routes/routes');

const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const app = express();

app.use(express.json());
app.use(express.static(CLIENT_PATH));
//eventual router goes below
app.use('/routes/routes', ArtRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});