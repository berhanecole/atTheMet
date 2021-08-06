// TODO
const path = require('path');
const cors = require('cors');
const express = require('express');
const { ArtRoutes } = require('./routes/routes');

const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static(CLIENT_PATH));
//eventual router goes below
app.use('/routes/routes', ArtRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});